import { IPlant } from '@project/shared';
import { buildEvent, EventTypes } from '@project/core';

import { resolverHandler } from '../../utils/resolver';
import { IServerContext } from '../../app';

interface IPlantQueryArgs {
  id: string;
}

export default resolverHandler(
  async (parent: undefined, args: IPlantQueryArgs, context: IServerContext) => {
    const plant: IPlant = await context.broker.call(
      'plants.getById',
      buildEvent({ data: { id: args.id }, type: EventTypes.GET }),
    );

    return plant;
  },
);
