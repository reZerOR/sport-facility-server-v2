import { z } from "zod";

const authValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: "email must be string",
        required_error: "email is required",
      })
      .email("Invalid email"),
    password: z
      .string({
        invalid_type_error: "password must be string",
        required_error: "password is required",
      })
      .min(8, "password minimum 8 characters long")
      .max(16, "password must be less then 16 character"),
  }),
});

export const AuthValidation = {
  authValidationSchema,
};
