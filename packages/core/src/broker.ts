import { ServiceBroker, ServiceSchema } from 'moleculer';

import { IMessage, buildMessage, MessageTypes } from './message';
import { InternalError, buildInternalError, InternalErrorTypes } from './error';
import { IServiceResponse } from './response';

const keys = ['BROKER_HOST', 'BROKER_USERNAME', 'BROKER_PASSWORD'];

export interface IBrokerConfig {
  BROKER_HOST: string;
  BROKER_USERNAME: string;
  BROKER_PASSWORD: string;
}

export interface IBrokerCallParams<P> {
  service: string;
  action: string;
  data: P;
}

export interface IBroker {
  query: <R = unknown, P = unknown>(params: IBrokerCallParams<P>) => Promise<IServiceResponse<R>>;
  command: <R = unknown, P = unknown>(params: IBrokerCallParams<P>) => Promise<IServiceResponse<R>>;
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
    query: <R = unknown, P = unknown>({
      service,
      action,
      data,
    }: IBrokerCallParams<P>): Promise<IServiceResponse<R>> =>
      broker.call<IServiceResponse<R>, IMessage>(
        [service, action].join('.'),
        buildMessage<P>({ data, type: MessageTypes.QUERY }),
      ),
    command: <R = unknown, P = unknown>({
      service,
      action,
      data,
    }: IBrokerCallParams<P>): Promise<IServiceResponse> =>
      broker.call<IServiceResponse, IMessage>(
        [service, action].join('.'),
        buildMessage<P>({ data, type: MessageTypes.COMMAND }),
      ),
    buildService: (options: ServiceSchema): ServiceBroker =>
      broker.createService({
        started: () => Promise.resolve(console.log(`${options.actions} service started`)),
        hooks: {
          error: {
            '*': (ctx, error): any => {
              if (!(error instanceof InternalError)) {
                console.error(error);
              }

              const errorToReturn =
                error instanceof InternalError
                  ? error
                  : buildInternalError({
                      code: 'internal-error',
                      message: 'Internal Error',
                      type: InternalErrorTypes.INTERNAL,
                    });

              return {
                timestamp: Date.now(),
                actionName: ctx.action.name,
                messageId: ctx.params.id,
                error: errorToReturn.toObject(),
                success: false,
              } as IServiceResponse;
            },
          },
        },
        ...options,
      }).broker,
  };
};
