const cors = require("cors");
const express = require("express");
//const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServer, gql } = require("apollo-server");

const { Sequelize } = require("sequelize");

require("dotenv").config();

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const PORT = process.env.PORT || 4000;

//const app = express();
//app.use(cors());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,

  context: ({ req, res }) => ({}),
});

//server.applyMiddleware({ app });

server.listen({ port: PORT }, () =>
  console.log(` Server ready at http://localhost:4000${server.graphqlPath}`)
);
