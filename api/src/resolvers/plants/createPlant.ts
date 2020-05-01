import { IPlant } from '@project/shared';
import { buildEvent, EventTypes } from '@project/core';

import { resolverHandler } from '../../utils/resolver';
import { IServerContext } from '../../app';

interface ICreatePlantMutationArgs {
  name: string;
  description: string;
}

export default resolverHandler(
  async (parent: undefined, args: ICreatePlantMutationArgs, context: IServerContext) => {
    const plant: IPlant = await context.broker.call(
      'plants.create',
      buildEvent({ data: args, type: EventTypes.GET }),
    );

    return plant;
  },
);
