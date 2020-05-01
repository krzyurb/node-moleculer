import { Plant, IPlantDocument } from '../models/plant.model';

interface ICreateData {
  name: string;
  description: string;
}

export const createPlant = (data: ICreateData): Promise<IPlantDocument> => Plant.create(data);
