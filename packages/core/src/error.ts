export enum InternalErrorTypes {
  OTHER = 'other',
  INTERNAL = 'internal',
}

export interface IInternalErrorData {
  message: string;
  code: string;
  type: InternalErrorTypes;
  data?: object;
}

export class InternalError extends Error {
  public type: InternalErrorTypes;
  public data?: object;
  public code: string;

  constructor({ type, message, data, code }: IInternalErrorData) {
    super(message);
    this.type = type;
    this.data = data;
    this.code = code;
  }

  public toObject(): IInternalErrorData {
    return {
      message: this.message,
      type: this.type,
      code: this.code,
      data: this.data,
    };
  }
}

export const buildInternalError = (data: IInternalErrorData): InternalError =>
  new InternalError(data);
