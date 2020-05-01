import { Plant, IPlantDocument } from '../models/plant.model';

export const getPlantById = (id: string): Promise<IPlantDocument | null> =>
  Plant.findById(id).exec();
