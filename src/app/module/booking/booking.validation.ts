import moment from "moment";
import { z } from "zod";
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const bookingValidationSchema = z.object({
  body: z.object({
    facility: z.string({
      invalid_type_error: "Facility must be string",
      required_error: "Facility id required",
    }),
    date: z
      .string({
        invalid_type_error: "Date must be string",
        required_error: "Date is required",
      })
      .date("The provided date is not valid")
      .refine(date=>{
        return moment(date).isSameOrAfter(moment(), "day")
      }, {message: 'Please provide a current or future date'}),
    startTime: z
      .string({
        invalid_type_error: "startTime must be string",
        required_error: "startTime is required",
      })
      .regex(timeRegex, { message: "Invalid time format, should be HH:MM" }),
    endTime: z
      .string({
        invalid_type_error: "endTime must be string",
        required_error: "endTime is required",
      })
      .regex(timeRegex, { message: "Invalid time format, should be HH:MM" }),
  }),
});


export const BookingValidation = {bookingValidationSchema}