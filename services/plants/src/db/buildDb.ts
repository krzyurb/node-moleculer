import mongoose from 'mongoose';

const options = { useNewUrlParser: true, useUnifiedTopology: true };

export const buildDb = (): Promise<typeof mongoose> =>
  mongoose.connect(process.env.DB_URL, options); // TODO: Config
