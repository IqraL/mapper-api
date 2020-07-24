const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = {
  Query: {
    hello: async () => {
      console.log(process.env);
      try {
        //await sequelize.authenticate();

        const [results, metadata] = await sequelize.query("SELECT * FROM test");

        console.log("Connection has been established successfully.");
        console.log("*************");
        console.log(results);
        console.log("*************");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
      return "Hi world";
    },
    getConservationAreas: async () => {
      try {
        const [results, metadata] = await sequelize.query(
          "SELECT * FROM geoData LIMIT 1"
        );
        const coordinates = results.map((r) => {
          const value = JSON.parse(r.value);

          return value.features.map((f) => f.geometry.coordinates[0]);
        });

        console.log("Connection has been established successfully.");
        console.log("*************");
        coordinates.map((c) => {
          console.log("--------------------");
          console.log(c);
          console.log("--------------------");
        });
        //  console.log(results[0].value.features[0].geometry.coordinates[0]);
        console.log("*************");
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
};
