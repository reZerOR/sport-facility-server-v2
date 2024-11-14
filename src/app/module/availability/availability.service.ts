import moment from "moment";
import { Booking } from "../booking/booking.model";

const checkAvailability = async (payload: { date?: string, facilityId?: string }) => {

  const date = payload.date ? payload.date : moment().format("YYYY-MM-DD");
  const facilityId = payload.facilityId;
  // console.log(date, facilityId);

  // Fetch all bookings for the given date and facility
  const bookings = await Booking.find({ date, facility: facilityId, isBooked: { $nin: ['canceled', 'pending']} });
  // console.log(bookings);

  // Example logic to determine available time slots
  const allTimeSlots = [
    { startTime: "08:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "12:00" },
    { startTime: "12:00", endTime: "14:00" },
    { startTime: "14:00", endTime: "16:00" },
    { startTime: "16:00", endTime: "18:00" },
    { startTime: "18:00", endTime: "20:00" },
    { startTime: "20:00", endTime: "22:00" },
    { startTime: "22:00", endTime: "00:00" },
  ];
  // console.log(bookings.length);

  const availableTimeSlots = allTimeSlots.filter((slot) => {
    return !bookings.some(
      (booking) =>
        moment(slot.startTime, "HH:mm").isBetween(
          moment(booking.startTime, "HH:mm"),
          moment(booking.endTime, "HH:mm"),
          undefined,
          "[)"
        ) ||
        moment(slot.endTime, "HH:mm").isBetween(
          moment(booking.startTime, "HH:mm"),
          moment(booking.endTime, "HH:mm"),
          undefined,
          "(]"
        )
    );
  });
  return availableTimeSlots;
};

export const AvailabilityService = {
  checkAvailability,
};
