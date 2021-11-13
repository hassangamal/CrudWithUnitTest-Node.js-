"use strict";
const { Model } = require("sequelize");
const { ROLES } = require("../../common/enums.js");
const { BASE_OPTIONS } = require("../baseAttributes.js");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Product, { foreignKey: "sellerId" });
    }
  }

  User.init(
    {
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
      deposit: DataTypes.INTEGER,
      role: DataTypes.ENUM(ROLES),
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
      ...BASE_OPTIONS,
    }
  );
  return User;
};
