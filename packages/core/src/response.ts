import { IInternalErrorData } from './error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IServiceResponse<P = any> {
  data?: P;
  error?: IInternalErrorData;
  actionName: string;
  messageId: string;
  success: boolean;
  timestamp: number;
}
