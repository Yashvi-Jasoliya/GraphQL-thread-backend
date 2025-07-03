import express from 'express'
import createApolloGraphqlServer from './graphql';
import { expressMiddleware } from '@as-integrations/express5';
import cors from "cors";

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 3005;
    app.use(express.json())
    app.use(cors())

    app.get('/', (req, res) => {
        res.json({ message: 'Server is up and running' });
    });

    app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));


}

init();