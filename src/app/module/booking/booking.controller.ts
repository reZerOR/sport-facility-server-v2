import httpStatus from "http-status";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const callbackUrl = req.headers.origin
  // console.log(callbackUrl)
  const result = await BookingServices.createBookingIntoDB(
    req.body,
    req.user.id,
    callbackUrl as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings created successfully",
    data: result,
  });
});

const allBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.allBookingFromDB();
  const isDataAvailable = result.length !== 0;
  sendResponse(res, {
    success: isDataAvailable,
    statusCode: isDataAvailable ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: isDataAvailable
      ? "Bookings retrieved successfully"
      : "No Data Found",
    data: result,
  });
});

const allUserBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.allUserBookingFromDB(req.user.id);
  const isDataAvailable = result.length !== 0;
  sendResponse(res, {
    success: isDataAvailable,
    statusCode: isDataAvailable ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: isDataAvailable
      ? "Bookings retrieved successfully"
      : "No Data Found",
    data: result,
  });
});

const getBookingById = catchAsync(async (req, res) => {
  const result = await BookingServices.getBookingById(req.params.id);
  sendResponse(res, {
    success: result !== null,
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result ? "Booking retrieved successfully" : "Booking not found",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res)=> {
  const result = await BookingServices.cancelBookingFromDB(req.user.id, req.params.id)
  sendResponse(res, {
    success: result !== null,
    statusCode: result ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result?"Booking cancelled successfully": "Booking not found or user not booked this booking",
    data: result,
  });
})

export const BookingController = {
  createBooking,
  allBookings,
  allUserBookings,
  cancelBooking,
  getBookingById
};
