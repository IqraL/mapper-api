const { gql } = require("apollo-server-express");
module.exports = gql`
  type TrainStain {
    crs: String!
    stationName: String
  }
  type Query {
    hello: String
  }
`;
