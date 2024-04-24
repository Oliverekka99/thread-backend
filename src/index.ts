import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphqlServer from './graphql';


async function init(){
    const app = express();
    const port = Number(process.env.port) || 8004;

    app.use(express.json());

    app.get('/', (req, res) => {
        res.json({message: "Server is up and running"});
    });

    // gqlserver middleware
    app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

    app.listen(port, () => {
        console.log(`Server Started at port: ${port}`);
    });
}

init();