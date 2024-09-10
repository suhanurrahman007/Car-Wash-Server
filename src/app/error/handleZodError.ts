import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericRequest } from "../interface/error";

const handleZodError = (err: ZodError):TGenericRequest => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};
 export default handleZodError