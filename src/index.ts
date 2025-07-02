import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from "cors";

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 3005;
    app.use(express.json())
    app.use(cors())

    // create graphql server
    const gqlserver = new ApolloServer({
        typeDefs: `
        type Query{
            hello: String
            say(name: String): String
        }
        `,
        resolvers: {
            Query: {
                hello: () => `Hey there, I am Graphql Server`,
                say: (_, {name}: {name: string}) => `Hey ${name}, How are you?`
            }
        },
    });
    await gqlserver.start();

    app.get('/', (req, res) => {
        res.json({ message: 'Server is up and running' });
    });

    app.use("/graphql", expressMiddleware(gqlserver))

    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));


}

init();