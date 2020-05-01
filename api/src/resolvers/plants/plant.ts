import { IPlant } from '@project/shared';
import { buildMessage, MessageTypes } from '@project/core';

import { resolverHandler } from '../../utils/resolver';
import { IServerContext } from '../../app';

interface IPlantQueryArgs {
  id: string;
}

export default resolverHandler(
  async (parent: undefined, args: IPlantQueryArgs, context: IServerContext) => {
    const plant = await context.broker.call<IPlant>(
      'plants',
      'getById',
      buildMessage<IPlantQueryArgs>({ data: { id: args.id }, type: MessageTypes.QUERY }),
    );

    return plant;
  },
);
