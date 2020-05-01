import { Context } from 'moleculer';
import { IMessage } from '@project/core';
import { checkMessage } from './message';

export type ActionHandler<P> = (message: IMessage<P>, ctx: Context<IMessage<P>>) => unknown;

export const actionHandler = <P>(handler: ActionHandler<P>) => (
  ctx: Context<IMessage<P>>,
): unknown => {
  try {
    checkMessage(ctx.params);
    return handler(ctx.params, ctx);
  } catch (error) {
    console.log(error);
    return { error, message: ctx.params };
  }
};
