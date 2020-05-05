import { IPlant } from '@project/shared';

import { resolverHandler } from '../../utils/resolver';
import { IServerContext } from '../../app';

interface ICreatePlantMutationArgs {
  name: string;
  description: string;
}

export default resolverHandler(
  async (parent: undefined, args: ICreatePlantMutationArgs, context: IServerContext) => {
    const plant = await context.broker.command<IPlant, ICreatePlantMutationArgs>({
      service: 'plants',
      action: 'create',
      data: args,
    });

    return plant;
  },
);
