import { actionHandler, InternalErrorTypes, buildInternalError } from '@project/core';
import { getPlantById } from '../db';
import { IPlant } from '@project/shared';

export interface IGetPlantByIdData {
  id: string;
}

export const getById = actionHandler<IGetPlantByIdData, Promise<IPlant>>(async message => {
  const {
    data: { id },
  } = message;

  const document = await getPlantById(id);

  if (!document) {
    throw buildInternalError({
      code: 'plant-not-found',
      message: 'Plant Not found',
      type: InternalErrorTypes.OTHER,
      data: { id },
    });
  }

  return {
    id: document.id,
    name: document.name,
    description: document.description,
  };
});
