module.exports = (req, res, next) => {
  const config = require("../config/dbconfig.js")["development"];
  const db = require("../models/index")(config, "data");
  req.db = db;
  next();
};
