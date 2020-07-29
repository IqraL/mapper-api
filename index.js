const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { Sequelize } = require("sequelize");

require("dotenv").config();

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `https://mapper-api-iqra-latif.herokuapp.com/`,
    settings: {
      "editor.theme": "dark",
    },
    introspection: true,
  },
  context: ({ req, res }) => ({}),
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(` Server ready at http://localhost:4000${server.graphqlPath}`)
);
