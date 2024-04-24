import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init(){
    const app = express();
    const port = Number(process.env.port) || 8004;

    app.use(express.json());

    // Create Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String
            }
        `, // Schema
        resolvers: {
            Query: {
                hello: () => `Hey, I am a Graphql Server`,
                say: (_, {name} : {name: string}) => `Hey ${name}, How are you?`,
            }
        }, // actual function which is called when query is made
    });

    // Start the gqlServer
    await gqlServer.start();

    app.get('/', (req, res) => {
        res.json({message: "Server is up and running"});
    });

    // gqlserver middleware
    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(port, () => {
        console.log(`Server Started at port: ${port}`);
    });
}

init();