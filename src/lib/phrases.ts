export const DAILY_PHRASES = [
  "✦ un día a la vez ✦",
  "✦ eres suficiente, siempre ✦",
  "✦ pequeños pasos, grandes cambios ✦",
  "✦ hoy también cuenta ✦",
  "✦ confía en tu proceso ✦",
  "✦ be kind to your mind ✦",
  "✦ lo estás haciendo bien ✦",
  "✦ respira, ya casi ✦",
  "✦ tu calma es tu poder ✦",
  "✦ date el tiempo que necesitas ✦",
  "✦ hoy es un buen día para empezar ✦",
  "✦ mereces todo lo bueno ✦",
  "✦ avanza a tu propio ritmo ✦",
  "✦ cuídate como cuidas a los demás ✦",
  "✦ la consistencia supera a la perfección ✦",
  "✦ eres más fuerte de lo que crees ✦",
  "✦ disfruta el camino, no solo la meta ✦",
  "✦ hoy hiciste tu mejor esfuerzo ✦",
  "✦ tienes todo lo que necesitas ✦",
  "✦ el descanso también es productivo ✦",
  "✦ celebra cada pequeña victoria ✦",
  "✦ sé gentil contigo misma ✦",
  "✦ tu historia apenas comienza ✦",
  "✦ florece a tu tiempo ✦",
  "✦ la paz empieza en ti ✦",
  "✦ haz una cosa con amor ✦",
  "✦ elige lo que te nutre ✦",
  "✦ hoy también vale la pena ✦",
];

export const REMINDERS = [
  { text: "Tomar agua y estirarse",    note: "cuídate, lo mereces",       icon: "drop"       },
  { text: "Salir a caminar 10 minutos", note: "el movimiento es medicina", icon: "leaf"       },
  { text: "Revisar tus tareas del día", note: "un paso a la vez",          icon: "sparkle"    },
  { text: "Escribe algo en tu diario",  note: "tus pensamientos importan", icon: "pencil"     },
  { text: "Haz una pausa y respira",    note: "tres respiraciones profundas", icon: "flower"  },
  { text: "Come algo nutritivo",        note: "tu cuerpo te lo agradece",  icon: "bowl"       },
  { text: "Desconéctate 15 minutos",    note: "la mente también descansa", icon: "cat-sleep"  },
  { text: "Revisa tu lista de compras", note: "¿falta algo en casa?",      icon: "basket"     },
  { text: "Manda un mensaje a alguien", note: "conectar hace bien",        icon: "envelope"   },
  { text: "Ordena un pequeño espacio",  note: "ambiente limpio, mente clara", icon: "sparkle" },
  { text: "Escucha tu canción favorita",note: "mereces ese momento",       icon: "heart"      },
  { text: "Prepara algo rico para tomar", note: "un ratito para ti",       icon: "cup"        },
];

/** Devuelve una frase según el día del año (cambia cada 24hs). */
export function getDailyPhrase(): string {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day   = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return DAILY_PHRASES[day % DAILY_PHRASES.length];
}

/** Devuelve un recordatorio según el bloque de 6hs del día. */
export function getCurrentReminder() {
  const block = Math.floor(new Date().getHours() / 6); // 0-3
  const seed  = new Date().getDate() * 4 + block;
  return REMINDERS[seed % REMINDERS.length];
}