/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericRequest } from '../interface/error';

const handleDuplicateError = (err: any): TGenericRequest => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already Exist`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Request',
    errorSources,
  };
};

export default handleDuplicateError;
