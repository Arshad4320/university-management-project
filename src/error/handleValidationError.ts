import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interface/error';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const error: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el.path,
        message: el.message,
      };
    },
  );
  return {
    statusCode: 200,
    message: 'validation Error',
    errorMessage: error,
  };
};
export default handleValidationError;
