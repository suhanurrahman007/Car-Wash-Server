import mongoose from 'mongoose';
import { TErrorSources, TGenericRequest } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError):TGenericRequest => {
  const errorSources: TErrorSources = [
    {
        path: err.path,
        message: err.message,
    }
  ]

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Cast  Error by Id',
    errorSources,
  };
};

export default handleCastError;
