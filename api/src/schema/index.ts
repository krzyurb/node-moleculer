import { gql } from 'apollo-server';

export default gql`
  type Plant {
    id: String!
    name: String!
    description: String!
  }

  type Query {
    plant(id: String!): Plant
    plants: [Plant]!
  }

  type Mutation {
    createPlant(name: String!, description: String!): Plant!
  }
`;
