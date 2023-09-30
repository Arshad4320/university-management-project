import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../../interface/error';
import handleValidationError from '../../error/handleValidationError';
import ApiError from '../../error/ApiError';
import config from '../../config';
import { errorLogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../error/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log(' global error handler', error)
    : errorLogger.error(' global error handler', error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessage: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifideError = handleValidationError(error);
    statusCode = simplifideError.statusCode;
    message = simplifideError.message;
    errorMessage = simplifideError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifideError = handleZodError(error);
    statusCode = simplifideError.statusCode;
    message = simplifideError.message;
    errorMessage = simplifideError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    (message = error?.message),
      (errorMessage = error?.message
        ? [
            {
              path: '',
              message: error?.message,
            },
          ]
        : []);
  }
  res.status(statusCode).json({
    status: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
