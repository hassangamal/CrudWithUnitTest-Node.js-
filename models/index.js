"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

function connect(config, models_path) {
  const db = {};
  let sequelize;
  if (typeof config == "string") {
    sequelize = new Sequelize(config);
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        dialect: config.dialect,
        host: config.host,
        port: config.port,
        dialectOptions: config.dialectOptions,
      }
    );
  }
  models_path = __dirname + "/" + models_path;
  fs.readdirSync(models_path)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      const model = require(path.join(models_path, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  return db;
}

module.exports = connect;
