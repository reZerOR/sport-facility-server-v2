import { Router } from "express";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.contstant";
import { FacilityController } from "./facility.controller";
import validateRequest from "../../middleware/validateRequest";
import { FacilityValidation } from "./facility.validation";

const route = Router();

route.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.facilityValidationSchema),
  FacilityController.createFacility
);
route.get("/", FacilityController.getAllFacility);
route.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.UpdateFacilityValidationSchema),
  FacilityController.updateFacility
);
route.delete("/:id", auth(USER_ROLE.admin), FacilityController.delteFacility);
route.get("/:id", FacilityController.getFacilityById);

export const FacilityRoutes = route;
