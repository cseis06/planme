import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Ingresá un email válido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

export type AuthInput = z.infer<typeof authSchema>;