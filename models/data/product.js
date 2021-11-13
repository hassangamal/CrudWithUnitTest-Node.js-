"use strict";
const { Model } = require("sequelize");
const { BASE_OPTIONS } = require("../baseAttributes.js");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "sellerId" });
    }
  }

  Product.init(
    {
      amountAvailable: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      sellerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      freezeTableName: true,
      ...BASE_OPTIONS,
    }
  );
  return Product;
};
