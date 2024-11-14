import { Router } from "express";
import { AvailabilityController } from "./availability.controller";
import { isValidAndFutureDate } from "../../middleware/isValidateAndFutureDate";

const router = Router();

router.get("/", isValidAndFutureDate, AvailabilityController.availability);

export const AvailabilityRoute = router;
