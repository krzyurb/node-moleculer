import { v1 } from 'uuid';
import { validate, validator } from './validator';

export enum EventTypes {
  CREATE = 'create',
  GET = 'get',
  UPDATE = 'update',
  DELETE = 'delete',
}

export interface IEvent<T = unknown> {
  id: string;
  type: EventTypes;
  timestamp: number;
  data: T;
}

export const buildEvent = (params: Omit<IEvent, 'id' | 'timestamp'>): IEvent => ({
  id: v1(),
  type: params.type,
  timestamp: Date.now(),
  data: params.data,
});

export const checkEvent = (event: unknown): IEvent =>
  validate(
    validator.object({
      id: validator.string(),
      type: validator.string(),
      timestamp: validator.number(),
      data: validator.any(),
    }),
    event,
  );
