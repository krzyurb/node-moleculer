import { Context } from 'moleculer';
import { IMessage } from '@project/core';
import { checkMessage } from './message';
import { IServiceResponse } from './response';

export type ActionHandler<P, R> = (
  message: IMessage<P>,
  ctx: Context<IMessage<P>>,
) => R | Promise<R>;

export const actionHandler = <P, R>(handler: ActionHandler<P, R>) => async (
  ctx: Context<IMessage<P>>,
): Promise<IServiceResponse<R>> => {
  const {
    action,
    params: { id },
  } = ctx;

  checkMessage(ctx.params);
  const result = await handler(ctx.params, ctx);

  return {
    timestamp: Date.now(),
    actionName: action.name,
    messageId: id,
    success: true,
    data: result,
  };
};
