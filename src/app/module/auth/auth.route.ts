import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.contstant";

const router = Router();

router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  AuthControllers.signUp
);
router.post(
  "/login",
  validateRequest(AuthValidation.authValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/auth",
  auth(USER_ROLE.admin),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
