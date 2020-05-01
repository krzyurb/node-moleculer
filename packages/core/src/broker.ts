import { ServiceBroker, ServiceSchema } from 'moleculer';
import { IMessage } from './message';

const keys = ['BROKER_HOST', 'BROKER_USERNAME', 'BROKER_PASSWORD'];

type IBrokerConfig = {
  BROKER_HOST: string;
  BROKER_USERNAME: string;
  BROKER_PASSWORD: string;
};

export interface IBroker {
  call: <R = unknown>(service: string, action: string, message: IMessage) => Promise<R>;
  start: () => Promise<void>;
  buildService: (options: ServiceSchema) => ServiceBroker;
}

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

export const buildBroker = (): IBroker => {
  const config = parseConfig();

  const broker = new ServiceBroker({
    transporter: buildTransporterUrl(config),
  });

  return {
    start: (): Promise<void> => broker.start(),
    call: <R = unknown>(service: string, action: string, message: IMessage): Promise<R> =>
      broker.call<R, IMessage>([service, action].join('.'), message),
    buildService: (options: ServiceSchema): ServiceBroker =>
      broker.createService({
        started: () => Promise.resolve(console.log(`${options.actions} service started`)),
        ...options,
      }).broker,
  };
};
