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
  },
};
