import { ServiceBroker } from 'moleculer';
export { ServiceBroker, ServiceSchema, Context } from 'moleculer';

const keys = ['BROKER_HOST', 'BROKER_USERNAME', 'BROKER_PASSWORD'];

type IBrokerConfig = {
  BROKER_HOST: string;
  BROKER_USERNAME: string;
  BROKER_PASSWORD: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkConfig = (config: any): void => {
  keys.forEach((key: string) => {
    if (!config[key] || config[key] == '') {
      throw new Error(`${key} is required in process.env`);
    }
  });
};

function parseConfig(config = process.env): IBrokerConfig {
  checkConfig(config);

  return {
    BROKER_HOST: config.BROKER_HOST,
    BROKER_USERNAME: config.BROKER_USERNAME,
    BROKER_PASSWORD: config.BROKER_PASSWORD,
  };
}

const buildTransporterUrl = (config: IBrokerConfig): string =>
  `amqp://${config.BROKER_USERNAME}:${config.BROKER_PASSWORD}@${config.BROKER_HOST}`;

export const buildBroker = (): ServiceBroker => {
  const config = parseConfig();

  return new ServiceBroker({
    transporter: buildTransporterUrl(config),
  });
};
