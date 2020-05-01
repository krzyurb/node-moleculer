import { ServiceSchema, ServiceBroker } from 'moleculer';
import { buildBroker } from './broker';

export const buildService = (options: ServiceSchema): ServiceBroker =>
  buildBroker().createService({
    started: () => Promise.resolve(console.log(`${options.actions} service started`)),
    ...options,
  }).broker;
