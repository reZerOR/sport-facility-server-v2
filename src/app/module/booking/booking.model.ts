import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id required"],
    ref: "User",
  },
  facility: {
    type: Schema.Types.ObjectId,
    required: [true, "Facility id required"],
    ref: "Facilitys",
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ["confirmed", "canceled", "pending"],
    default: "pending",
  },
});


export const Booking = model<TBooking>('Booking', bookingSchema)