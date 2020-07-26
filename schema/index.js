const { gql } = require("apollo-server-express");
const GraphQLJSON = require("graphql-type-json");

module.exports = gql`
  scalar JSON

  type polygon {
    markers: JSON
  }

  type cctv {
    location: String
    points: [Float]
  }
  type Query {
    getConservationAreas: JSON
    getCctvLocations: [cctv]
  }
`;
