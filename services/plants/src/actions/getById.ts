import { actionHandler } from '@project/core';
import { getPlantById } from '../db';

export interface IGetPlantByIdData {
  id: string;
}

export const getById = actionHandler<IGetPlantByIdData>(async message => {
  // Read input
  const {
    data: { id },
  } = message;

  // Fetch from db
  const document = await getPlantById(id);

  // Build response
  if (!document) {
    return null;
  }

  return {
    id: document.id,
    name: document.name,
    description: document.description,
  };
});
