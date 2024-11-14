import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { Facility } from "../facility/facility.model";
import { TBooking } from "./booking.interface";
import { calculatePayableAmount } from "./booking.utiles";
import moment from "moment";
import { Booking } from "./booking.model";
import { TUser } from "../user/user.interface";
import { initiatePayment } from "../payment/payment.utils";

const createBookingIntoDB = async (
  paylod: Partial<TBooking>,
  userId: string,
  callbackUrl: string
) => {
  const { facility, startTime, endTime, date } = paylod;
  // find facility exist
  const isFacilityExist = await Facility.findOne({
    _id: facility,
    isDeleted: false,
  });
  if (!isFacilityExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Facility not found");
  }

  // check availability
  const bookings = await Booking.find({ date, isBooked: { $ne: "canceled" }, facility });
  const isRequestedSlotAvailable = !bookings.some(
    (booking) =>
      moment(startTime, "HH:mm").isBetween(
        moment(booking.startTime, "HH:mm"),
        moment(booking.endTime, "HH:mm"),
        undefined,
        "[)"
      ) ||
      moment(endTime, "HH:mm").isBetween(
        moment(booking.startTime, "HH:mm"),
        moment(booking.endTime, "HH:mm"),
        undefined,
        "(]"
      )
  );
  if (!isRequestedSlotAvailable) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Requested slot is not available"
    );
  }

  // calculate payable amount
  const payableAmount = calculatePayableAmount(
    startTime!,
    endTime!,
    isFacilityExist.pricePerHour
  );

  // create booking
  const createBooking = await (await (await Booking.create({
    ...paylod,
    payableAmount,
    user: userId,
  })).populate("facility")).populate("user", "-password");
  const transactionId = `txn_${Date.now()}`
  const paymentData = {
    transactionId,
    callbackUrl,
    bookingId: createBooking._id.toString(),
    totalPrice: payableAmount,
    custormerName: (createBooking.user as unknown as TUser).name,
    customerEmail: (createBooking.user as unknown as TUser).email,
    customerAddress: (createBooking.user as unknown as TUser).address,
    customerPhone: (createBooking.user as unknown as TUser).phone,
  }
  const paymentResponse = await initiatePayment(paymentData)
  // console.log(paymentResponse);
  return paymentResponse;
};
const allBookingFromDB = async () => {
  const bookings = await Booking.find()
    .populate("user", "-password")
    .populate("facility");
  return bookings;
};
const allUserBookingFromDB = async (user: string) => {
  const bookings = await Booking.find({ user, isBooked: { $nin: ["pending"] } }).populate("facility");
  return bookings;
};
const getBookingById = async (id: string) => {
  const booking = await Booking.findById(id).populate("facility");
  return booking;
};
const cancelBookingFromDB = async (user: string, id: string) => {
  const bookings = await Booking.findOneAndUpdate(
    { _id: id, user },
    { isBooked: "canceled" },
    {
      new: true,
      runValidators: true
    }
  ).populate("facility");
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  allBookingFromDB,
  allUserBookingFromDB,
  cancelBookingFromDB,
  getBookingById,
};
