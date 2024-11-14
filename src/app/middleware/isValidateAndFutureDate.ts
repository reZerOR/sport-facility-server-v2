import moment from "moment";
import { AppError } from "../errors/AppError";
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

export const isValidAndFutureDate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const date = req.query?.date as string;
  if (!date) {
   return next();
  }
  const format = "YYYY-MM-DD";
  const isValid = moment(date, format, true).isValid();
  if (!isValid) {
    throw new AppError(httpStatus.BAD_REQUEST, "Please provide valid date");
  }
  const isFutureOrToday = moment(date).isSameOrAfter(moment(), "day");
  if (!isFutureOrToday) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please provide current or future date"
    );
  }
  next();
};
