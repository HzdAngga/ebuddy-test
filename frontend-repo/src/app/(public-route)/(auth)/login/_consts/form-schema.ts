import { z } from "zod";
import { AUTH_LOGIN_FIELD_KEY } from "./form-field";

export const authLoginFormSchema = z.object({
  [AUTH_LOGIN_FIELD_KEY.email]: z
    .string({
      required_error: "Enter your email",
    })
    .trim()
    .min(1, "Enter your email")
    .email("Must be in valid email format"),
  [AUTH_LOGIN_FIELD_KEY.password]: z
    .string({
      required_error: "Enter your password",
    })
    .trim()
    .min(1, "Enter your password"),
});

export type AuthLoginFormSchema = z.infer<typeof authLoginFormSchema>;
