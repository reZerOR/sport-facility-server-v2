import { verifyPayment } from "./payment.utils";
import { Booking } from "../booking/booking.model";
const deleteBooking = async (bookingId: string) => {
  await Booking.findByIdAndDelete(bookingId);
};

const confirmationService = async (
  transactionId: string,
  bookingId: string,
  status: string
) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result = {};
  let message = "";
  if (status === "success") {
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
      result = (await Booking.findByIdAndUpdate(bookingId, {
          isBooked: "confirmed",
        },
        { new: true })
      ) || {};
      message = "Successfully Paid!";
    } else {
      message = "Payment Failed!";
      await deleteBooking(bookingId);
    }
  } else {
    message = "Payment Canceled!";
    await deleteBooking(bookingId);
  }

  
  return { result, message };
};

export const paymentServices = {
  confirmationService,
};
