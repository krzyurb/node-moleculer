export enum InternalErrorTypes {
  OTHER = 'other',
  VALIDATION = 'validation',
}

export interface IInternalErrorData {
  message: string;
  code: string;
  source: string;
  type: InternalErrorTypes;
  data?: object;
}

export interface IInternalErrorObject extends IInternalErrorData {
  isInternal: true;
}

export class InternalError extends Error {
  public type: InternalErrorTypes;
  public data?: object;
  public code: string;
  public source: string;

  constructor({ type, message, data, code, source }: IInternalErrorData) {
    super(`InternalError: ${message}`);
    this.type = type;
    this.data = data;
    this.code = code;
    this.source = source;
  }

  public toObject(): IInternalErrorObject {
    return {
      isInternal: true,
      message: this.message,
      type: this.type,
      code: this.code,
      source: this.source,
      data: this.data,
    };
  }
}

export const buildInternalError = (data: IInternalErrorData): InternalError =>
  new InternalError(data);
