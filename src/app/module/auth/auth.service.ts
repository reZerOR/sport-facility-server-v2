import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, "This email is already exists");
  }

  const createUser = await User.create(payload);
  const userObject: Partial<TUser> = createUser.toObject();
  delete userObject.password;

  return userObject;
};

const checkLoginUser = async (paylod: TAuth) => {
  const user = await User.isUserExistsByEmail(paylod.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // checking if password matched or not
  if (!(await User.isPasswordMatched(paylod?.password, user.password!))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password is incorrect");
  }

  // deleting password field from user
  const userObject: Partial<TUser> = user.toObject();
  delete userObject.password;

  const jwtPayload = {
    userEmail: user.email!,
    role: user.role!,
  };

  // creating token for the user
  const accesToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string
  );

  return {
    accesToken,
    user: userObject,
  };
};

export const AuthServices = {
  createUserIntoDB,
  checkLoginUser,
};
