const { ApolloServer, gql } = require("apollo-server");
require("dotenv").config();
const MyDatabase = require("./myDatabase");

const knexConfig = {
    client: "pg",
    connection: {
        host: process.env.HOST,
        port: process.env.PGPORT,
        user: process.env.DBUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
    },
};

const db = new MyDatabase(knexConfig);

const typeDefs = gql`
    type Query {
        hello: String
        users: [User]
        posts: [Post]
    }
    
    type Mutation {
        addUser(email:String, password:String, firstName:String, lastName:String): User
    }

    type User {
        id: ID
        email: String
        password: String
        firstName: String
        lastName: String
    }

    type Post {
        id: ID
        author: User
        comments: Post
        content: String
        createdAt: String
        updatedAt: String
    }
`;

const resolvers = {
    Query: {
        users: async (_, args, { dataSources }) => {
            return dataSources.db.getUsers();
        },
    },
    Mutation: {
        addUser: async (_, args, { dataSources }) => {
            return dataSources.db.Register(args)
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ db }),
});

server.listen({ port: 4000 }, () =>
    console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
