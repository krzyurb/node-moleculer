/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResolverFn } from 'apollo-server';
import { IServerContext } from '../app';

export type ResolverHandler = (
  parent?: any,
  args?: any,
  context?: IServerContext,
  info?: any,
) => unknown;

export const resolverHandler = (handler: ResolverHandler): ResolverFn => (
  parent?: any,
  args?: any,
  context?: IServerContext,
  info?: any,
): any => {
  try {
    return handler(parent, args, context, info);
  } catch (error) {
    console.log(error);
    return { error };
  }
};
