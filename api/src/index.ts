import { buildBroker } from '@project/core';

import { buildServer } from './app';

async function bootstrap(): Promise<void> {
  try {
    const broker = buildBroker();
    await broker.start();

    buildServer({ broker })
      .listen(3000)
      .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
