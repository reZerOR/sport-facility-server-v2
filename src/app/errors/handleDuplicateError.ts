
import { Error } from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: Error): TGenericErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: '',
      message: err?.message
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Entry',
    errorSources,
  };
};

export default handleDuplicateError;