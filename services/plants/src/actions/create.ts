import { actionHandler } from '@project/core';
import { createPlant } from '../db';

export interface ICreatePlantData {
  name: string;
  description: string;
}

export const create = actionHandler<ICreatePlantData>(async message => {
  // Read input
  const { data } = message;

  // Fetch from db
  const document = await createPlant(data);

  // Build response
  return {
    id: document.id,
    name: document.name,
    description: document.description,
  };
});
