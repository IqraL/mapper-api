const { Sequelize } = require("sequelize");
const cctvRawData = require("../data/CctvData.json");
const librariesRawData = require("../data/librariesData.json");

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
    getRailwayStations: async () => {
      const [results, metadata] = await sequelize.query(
        "SELECT * FROM `trainStationLocations`"
      );
      const railStationObjs = [];
      if (results && results.length > 0)
        results.forEach((ts) => {
          railStationObjs.push({
            name: ts.trainstationName,
            points: [ts.latitude, ts.longitude],
          });
        });
      return railStationObjs;
    },
    getLibraries: () => {
      const librariesProcessed = librariesRawData.features.map((library) => {
        const revesedPoints = [];
        revesedPoints.push(library.geometry.coordinates[1]);
        revesedPoints.push(library.geometry.coordinates[0]);

        return {
          points: revesedPoints,
          name: library.properties.NAME,
          address: library.properties.ADDRESS_1,
          postcode: library.properties.POSTCODE,
          telepone: library.properties.TELEPHONE,
        };
      });

      return librariesProcessed;
    },
    getCctvLocations: () => {
      const cctvProcessed = cctvRawData.features.map((cctvObj) => {
        const revesedPoints = [];
        revesedPoints.push(cctvObj.geometry.coordinates[1]);
        revesedPoints.push(cctvObj.geometry.coordinates[0]);

        return { points: revesedPoints, location: cctvObj.properties.location };
      });

      return cctvProcessed;
    },
    getConservationAreas: async () => {
      try {
        const [results, metadata] = await sequelize.query(
          "SELECT * FROM geoData WHERE type = 'ConservationAreas'"
        );
        const coordinates = results.map((r) => {
          const value = JSON.parse(r.value);
          return value.features.map((f) => f.geometry.coordinates[0]);
        });

        const temp = [];
        coordinates.forEach((c) => {
          c.forEach((a) => {
            temp.push(a);
          });
        });

        const conservationAreasProcessed = [];

        for (let area of temp) {
          const areaTemp = [];
          for (let coordinates of area) {
            const coordinateTemp = [];
            coordinateTemp.push(coordinates[1]);
            coordinateTemp.push(coordinates[0]);
            areaTemp.push(coordinateTemp);
          }
          conservationAreasProcessed.push(areaTemp);
        }

        return conservationAreasProcessed;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
};
