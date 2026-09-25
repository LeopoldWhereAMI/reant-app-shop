import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Минимум 1 символ"),
  phoneNumber: z
    .string()
    .trim()
    .min(12, "Минимум 12 символов")
    .max(12, "Максимум 12 символов"),
  email: z
    .string()
    .trim()
    .min(6, "Минимум 6 символов")
    .pipe(z.email({ error: "Некорректный email" })),
  password: z.string().trim().min(8, "Минимум 8 символов"),
  agreeToTerms: z.literal(true, {
    error: "Необходимо согласие на обработку данных",
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
