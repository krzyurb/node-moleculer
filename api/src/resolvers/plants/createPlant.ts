import { IPlant } from '@project/shared';
import { buildMessage, MessageTypes } from '@project/core';

import { resolverHandler } from '../../utils/resolver';
import { IServerContext } from '../../app';

interface ICreatePlantMutationArgs {
  name: string;
  description: string;
}

export default resolverHandler(
  async (parent: undefined, args: ICreatePlantMutationArgs, context: IServerContext) => {
    const plant = await context.broker.call<IPlant>(
      'plants',
      'create',
      buildMessage({ data: args, type: MessageTypes.COMMAND }),
    );

    return plant;
  },
);
