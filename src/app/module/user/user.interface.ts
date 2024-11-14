import { Document, Model } from "mongoose";
import { USER_ROLE } from "./user.contstant";

export interface TUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

export interface UserMethods extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TuserRole = keyof typeof USER_ROLE;
