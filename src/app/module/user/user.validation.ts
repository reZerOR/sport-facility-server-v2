import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "name must be string",
      required_error: "name is required",
    }),
    email: z
      .string({
        invalid_type_error: "email must be string",
        required_error: "email is required",
      })
      .email("Invalid email"),
    phone: z
      .string({
        invalid_type_error: "phone number must be string",
        required_error: "phone number is required",
      })
      .min(11, { message: "Phone number must be exactly 11 characters long." })
      .max(11, { message: "Phone number must be exactly 11 characters long." })
      .regex(
        /^01\d{9}$/,
        "Phone number must start with '01' and be 11 digits long."
      ),
    role: z.enum(["admin", "user"]),
    address: z.string({
      invalid_type_error: "address must be string",
      required_error: "address is required",
    }),
    password: z
      .string({
        invalid_type_error: "password must be string",
        required_error: "password is required",
      })
      .min(8, "password minimum 8 characters long")
      .max(16, "password must be less then 16 character"),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
