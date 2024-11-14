import httpStatus from "http-status";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import { FacilityService } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.createFacilityIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility added successfully",
    data: result,
  });
});

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityService.updateFacilityByIdIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility updated successfully",
    data: result,
  });
});
const delteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityService.DeleteFacilityByIdIntoDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility deleted successfully",
    data: result,
  });
});

const getAllFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.geAllGacilityFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

const getFacilityById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityService.getFacilityByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facility retrieved successfully",
    data: result,
  });
});
export const FacilityController = {
  createFacility,
  updateFacility,
  delteFacility,
  getAllFacility,
  getFacilityById,
};
