import { z } from "zod";

const facilityValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "name must be string",
      required_error: "name is required",
    }),
    description: z.string({
      invalid_type_error: "description must be string",
      required_error: "description is required",
    }),
    pricePerHour: z.number({
      invalid_type_error: "pricePerHour must be string",
      required_error: "pricePerHour is required",
    }),
    image: z.string({
      invalid_type_error: "image must be string",
      required_error: "image is required",
    }),
    location: z.string({
      invalid_type_error: "location must be string",
      required_error: "location is required",
    }),
  }),
});
const UpdateFacilityValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "name must be string",
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: "description must be string",
      })
      .optional(),
    pricePerHour: z
      .number({
        invalid_type_error: "pricePerHour must be string",
      })
      .optional(),
    location: z
      .string({
        invalid_type_error: "location must be string",
      })
      .optional(),
    image: z
      .string({
        invalid_type_error: "image must be string",
      })
      .optional(),
  }),
});

export const FacilityValidation = {
  facilityValidationSchema,
  UpdateFacilityValidationSchema,
};
