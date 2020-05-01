import mongoose, { Schema, Document } from 'mongoose';
import { IPlant } from '@project/shared';

export interface IPlantDocument extends Omit<IPlant, 'id'>, Document {}

const PlantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Plant = mongoose.model<IPlantDocument>('Plant', PlantSchema);
