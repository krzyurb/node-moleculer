import { ApolloServer } from 'apollo-server';
import { ServiceBroker } from '@project/core';

import typeDefs from './schema';
import resolvers from './resolvers';

interface IBuildServerOptions {
  broker: ServiceBroker;
}

export interface IServerContext {
  broker: ServiceBroker;
}

export const buildServer = ({ broker }: IBuildServerOptions): ApolloServer => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: { broker },
  });
};
