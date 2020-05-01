/* eslint-disable @typescript-eslint/no-explicit-any */
import { IServerContext } from '../app';
// import { ResolverFn } from 'apollo-server';

export type ResolverHandler = (
  parent?: any,
  args?: any,
  context?: IServerContext,
  info?: any,
) => unknown;

export const resolverHandler = (handler: ResolverHandler) => (
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
