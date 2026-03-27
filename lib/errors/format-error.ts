import { AppError } from "./app-error";


export const formatError = (err: AppError) => {
    if(process.env.NODE_ENV === "production") return formatErrorProd(err);
    return formatErrorDev(err);
}

const formatErrorDev = (err: AppError) => {
  return {
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  };
}

const formatErrorProd = (err: AppError) =>  {
  if (err.isOperational) {
    return {
      status: err.status,
      message: err.message,
    };
  }

  return {
    status: "error",
    message: "Something went wrong",
  };
}