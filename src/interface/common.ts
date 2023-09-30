import { IGenericErrorMessage } from './error';
type IGenericResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};
export default IGenericResponse;
