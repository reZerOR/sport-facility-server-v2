import { Response } from "express";

// export const sendResponse = <T>(
//   res: Response,
//   data: {
//     statusCode: number;
//     success: boolean;
//     message?: string;
//     token?: string;
//     data: T;
//   }
// ) => {
//   if (data.token) {
//     return res.status(data.statusCode).json({
//       success: data.success,
//       statusCode: data.statusCode,
//       message: data.message,
//       token: data.token,
//       data: data.data,
//     });
//   } else {
//     return res.status(data.statusCode).json({
//       success: data.success,
//       statusCode: data.statusCode,
//       message: data.message,
//       data: data.data,
//     });
//   }
// };

interface ResponseData<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data: T;
}

export const sendResponse = <T>(
  res: Response,
  responseData: ResponseData<T>
) => {
  const { statusCode, success, message, token, data } = responseData;

  const responsePayload: Partial<ResponseData<T>> = {
    success,
    statusCode,
    message,
  };
  if (token) {
    responsePayload.token = token;
  }
  responsePayload.data = data;

  return res.status(statusCode).json(responsePayload);
};
