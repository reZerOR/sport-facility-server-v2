import httpStatus from "http-status";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import { AvailabilityService } from "./availability.service";

const availability = catchAsync(async (req, res, _next) => {
  const result = await AvailabilityService.checkAvailability({
    date: req.query.date as string,
    facilityId: req.query.facilityId as string,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability checked successfully",
    data: result,
  });
});

export const AvailabilityController = {
  availability,
};
