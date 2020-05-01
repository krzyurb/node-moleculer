import { buildBroker } from '@project/core';
import { buildDb } from './db/buildDb';
import actions from './actions';

async function bootstrap(): Promise<void> {
  try {
    buildBroker()
      .buildService({ name: 'plants', actions })
      .start();
    await buildDb();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
