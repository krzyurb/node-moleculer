import { Context } from 'moleculer';
import { IEvent } from '@project/core';
import { checkEvent } from './event';

export type ActionHandler<P> = (event: IEvent<P>, ctx: Context<IEvent<P>>) => unknown;

export const actionHandler = <P>(handler: ActionHandler<P>) => (
  ctx: Context<IEvent<P>>,
): unknown => {
  try {
    checkEvent(ctx.params);
    return handler(ctx.params, ctx);
  } catch (error) {
    console.log(error);
    return { error, event: ctx.params };
  }
};
