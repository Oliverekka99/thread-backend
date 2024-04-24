import { ApolloServer } from '@apollo/server';
import { PrismaClientInstance } from '../lib/db';
import { User } from './user';

async function createApolloGraphqlServer() {

    // Create Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                ${User.queries}
            },
            type Mutation {
                ${User.mutations}
            },
        `, // Schema
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
            Mutation: {
                ...User.resolvers.mutations,
            },
        }, // actual function which is called when query is made
    });

    // Start the gqlServer
    await gqlServer.start();
    return gqlServer;
}

export default createApolloGraphqlServer;