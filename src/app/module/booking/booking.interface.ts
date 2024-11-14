import {Types } from "mongoose";

export type TBooking = {
  user: Types.ObjectId;
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  payableAmount: number;
  isBooked: 'confirmed' | "canceled" | "pending";
};


// export interface Methods extends Model<TBooking> {
//   //instance methods for checking if the user exist
//   isUserExistsByEmail(email: string): Promise<TUser>;
//   isPasswordMatched(
//     plainTextPassword: string,
//     hashedPassword: string
//   ): Promise<boolean>;
// }