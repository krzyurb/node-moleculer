import { actionHandler } from '@project/core';
import { IPlant } from '@project/shared';
import { createPlant } from '../db';

export interface ICreatePlantData {
  name: string;
  description: string;
}

export const create = actionHandler<ICreatePlantData, Promise<IPlant>>(async message => {
  const { data } = message;

  const document = await createPlant(data);

  return {
    id: document.id,
    name: document.name,
    description: document.description,
  };
});
