import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import { User } from "./user";

async function createApolloGraphqlServer() {

    // create graphql server
    const gqlserver = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
            type Mutation {
                 ${User.mutations}
            }
            `,
        resolvers: {
            Query: {
                // hello: () => `Hey there, I am Graphql Server`,
                // say: (_, { name }: { name: string }) => `Hey ${name}, How are you?`

                ...User.resolvers.queries,
            },
            Mutation: {
                // createUser: async (__, { firstName, lastName, email, password }:
                //     { firstName: string, lastName: string, email: string, password: string }) => {
                //     await prismaClient.user.create({
                //         data: {
                //             email,
                //             firstName,
                //             lastName,
                //             password,
                //             salt: "random_salt",
                //         },
                //     });
                //     return true;
                // },
           
                ...User.resolvers.mutations,
            }
        },
    });
    await gqlserver.start();

    return gqlserver;
}

export default createApolloGraphqlServer;