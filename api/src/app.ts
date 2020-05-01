import { ApolloServer } from 'apollo-server';
import { IBroker } from '@project/core';

import typeDefs from './schema';
import resolvers from './resolvers';

interface IBuildServerOptions {
  broker: IBroker;
}

export interface IServerContext {
  broker: IBroker;
}

export const buildServer = ({ broker }: IBuildServerOptions): ApolloServer => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: { broker },
  });
};
