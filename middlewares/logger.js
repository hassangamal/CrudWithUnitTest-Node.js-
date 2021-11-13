const logger = require("../utils/logger.js");
module.exports = (req, res, next) => {
  logger.info(req.method + ":" + req.path);
  next();
};
