import { catchAsync } from "../../utilities/catchAsync";
import { paymentServices } from "./payment.service";

const confirmation = catchAsync(async (req, res) => {
  const result = await paymentServices.confirmationService(
    req.query.transactionId as string,
    req.query.bookingId as string,
    req.query.status as string
  );
  // console.log('2');
  
  console.log(result);
  res.redirect(req.query.callbackUrl as string);
});

export const paymentController = {
  confirmation,
};
