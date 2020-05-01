import { v1 } from 'uuid';
import { validate, validator } from './validator';

export enum MessageTypes {
  QUERY = 'query',
  COMMAND = 'command',
}

export interface IMessage<T = unknown> {
  id: string;
  type: MessageTypes;
  timestamp: number;
  data: T;
}

export const buildMessage = <T>(params: Omit<IMessage, 'id' | 'timestamp'>): IMessage<T> => ({
  id: v1(),
  type: params.type,
  timestamp: Date.now(),
  data: params.data as T,
});

export const checkMessage = (message: unknown): IMessage =>
  validate(
    validator.object({
      id: validator.string(),
      type: validator.string(),
      timestamp: validator.number(),
      data: validator.any(),
    }),
    message,
  );
