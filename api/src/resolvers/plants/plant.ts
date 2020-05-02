import { IPlant } from '@project/shared';

import { resolverHandler } from '../../utils/resolver';
import { IServerContext } from '../../app';

interface IPlantQueryArgs {
  id: string;
}

export default resolverHandler(
  async (parent: undefined, args: IPlantQueryArgs, context: IServerContext) => {
    const plant = await context.broker.command<IPlant, IPlantQueryArgs>({
      service: 'plants',
      action: 'getById',
      data: { id: args.id },
    });

    return plant;
  },
);
