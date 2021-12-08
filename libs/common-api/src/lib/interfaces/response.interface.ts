// success: true => message, data
// success: false => errorMessage, error

export interface IResponse<T = any, E = any> {
  success: boolean;
  message: string;
  errorMessage: string;
  data: T;
  error: E;
}
