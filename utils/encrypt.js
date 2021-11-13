const bcrypt = require("bcrypt");
generateHash = async (password) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
};
module.exports = {
  generateHash,
};
