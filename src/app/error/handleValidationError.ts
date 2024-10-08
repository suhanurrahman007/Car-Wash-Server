import mongoose from "mongoose";
import { TErrorSources, TGenericRequest } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError):TGenericRequest => {
  const errorSources: TErrorSources = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) =>{
    return {
      path: value.path,
      message: value.message
    };
  })

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;