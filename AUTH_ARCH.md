# AUTH ARCHITECTURE

Contrato de autenticación de **Planme**. Toda la app depende de este flujo.
Ningún módulo (Finanzas, Eventos, Diario, Compras, Home, etc.) debe reimplementar
validación manual de sesión. La única fuente de verdad es el **Middleware + cookies
de `@supabase/ssr`**.

---

## 1. Cómo viaja el token de sesión (Cookies)

La sesión vive en **cookies HTTP**, no en `localStorage` ni en estado de React.

- `@supabase/ssr` guarda el **access token** (JWT, ~1h) y el **refresh token** en cookies.
- Las cookies se configuran con `maxAge: 60 * 60 * 24` (**24h**), `sameSite: "lax"` y
  `secure: true` en producción.
- En **cada request**, el middleware lee esas cookies, valida la sesión y, si hace falta,
  refresca el access token y reescribe las cookies en la respuesta.
- Quién lee la sesión según el contexto:
  - **Server Components / Server Actions / Route Handlers** → `createClient()` de
    `src/lib/supabase/server.ts` (lee `cookies()` de `next/headers`).
  - **Client Components** → `createClient()` de `src/lib/supabase/client.ts`
    (lee las mismas cookies vía el browser client).
  - **Middleware** → `updateSession()` de `src/lib/supabase/middleware.ts`.

> Regla de oro: para saber si hay usuario, usar **`supabase.auth.getUser()`**
> (valida contra el servidor de Supabase). **Nunca** `getSession()` para decisiones de
> seguridad: lee la cookie sin verificar y es spoofable.

---

## 2. Comportamiento del Middleware (rutas públicas vs. privadas)

Archivo: `src/middleware.ts` → delega en `updateSession()`.

**Rutas públicas** (no requieren sesión):

```
/login
/auth   (incluye /auth/callback para OAuth de Google)
```

Cualquier otra ruta es **privada**.

Lógica de redirección:

| Estado del usuario | Ruta solicitada     | Resultado                          |
|--------------------|---------------------|------------------------------------|
| No autenticado     | Ruta privada        | `redirect → /login`                |
| No autenticado     | Ruta pública        | Pasa                               |
| Autenticado        | `/login`            | `redirect → /dashboard` (bypass)   |
| Autenticado        | Ruta privada        | Pasa                               |

- El redirect ocurre **en el servidor**, antes de renderizar → sin parpadeo de pantalla.
- El `matcher` excluye assets estáticos (`_next/static`, `_next/image`, favicon, imágenes).
- El middleware **solo** hace auth-gate y refresh de token. No metas lógica de negocio
  ahí (corre en cada request).

Para agregar un módulo nuevo: con que su ruta **no** esté en la lista pública, queda
protegido automáticamente. No hay que tocar nada de auth en el módulo.

---

## 3. Estructura del objeto `User` de Supabase

`supabase.auth.getUser()` devuelve `{ data: { user }, error }`. Forma de `user`
(tipo `User` de `@supabase/supabase-js`), campos relevantes para consumir en módulos:

```ts
interface User {
  id: string;                    // UUID — usar como FK en tablas (user_id)
  email?: string;
  phone?: string;
  aud: string;
  role?: string;
  created_at: string;            // ISO
  updated_at?: string;
  last_sign_in_at?: string;
  email_confirmed_at?: string;
  confirmed_at?: string;

  app_metadata: {                // controlado por el servidor — NO editable por el cliente
    provider?: string;           // "email" | "google" | ...
    providers?: string[];
  };

  user_metadata: {               // datos del perfil (editables vía updateUser)
    // OAuth Google completa típicamente:
    full_name?: string;
    name?: string;
    avatar_url?: string;
    picture?: string;
    email?: string;
    email_verified?: boolean;
    // + cualquier campo custom que guardemos
  };

  identities?: Array<{
    provider: string;
    identity_data?: Record<string, unknown>;
  }>;
}
```

Consumo recomendado en módulos:

```ts
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

const userId = user!.id;                       // FK para queries/RLS
const displayName =
  user!.user_metadata.full_name ?? user!.email;
const avatar = user!.user_metadata.avatar_url;
```

Notas:

- **`id`** es la clave para `RLS` y para la columna `user_id` de las tablas de cada módulo.
- **`app_metadata`** = confiable (servidor). **`user_metadata`** = editable por el usuario,
  no lo uses para autorización.
- Como la ruta ya pasó el middleware, dentro de un módulo privado `user` está garantizado;
  igual conviene el `!` o un guard explícito por tipado.

---

## Resumen del contrato

1. Sesión = cookies de `@supabase/ssr`, 24h, refrescadas por el middleware.
2. Autorización = middleware + `getUser()`. Nunca validación manual ni `getSession()`.
3. Identidad del usuario = `user.id` (FK / RLS) + `user_metadata` para UI.
4. Módulo nuevo = solo crear la ruta; la protección es automática.