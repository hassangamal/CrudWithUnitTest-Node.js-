const logger = require("../utils/logger.js");
const BaseController = require("./BaseController.js");
const { ROLES } = require("../common/enums.js");
class UserController extends BaseController {
  createUser = () => {
    return async (req, res) => {
      try {
        const model = req.db[this.model_name];
        const hash = await generateHash(req.body.password);
        req.body.password = hash;
        const instance = await model.create(req.body);
        return res.status(200).send(" created successfully");
      } catch (e) {
        logger.error(`${e}`);
        res.status(500).send("error while creating " + this.model_name);
      } finally {
        req.db.sequelize.close();
      }
    };
  };

  addDeposit = () => {
    return async (req, res) => {
      try {
        const model = req.db[this.model_name];
        const depoist_values = [5, 10, 20, 50, 100];
        const found = depoist_values.find(
          (element) => element == req.body.deposit
        );
        if (!found) {
          res.status(200).json({
            message: "this deposit not accept",
          });
        } else {
          let user = await model.findOne({
            where: {
              id: req.body.id,
              role: ROLES[0],
            },
          });
          if (user) {
            const deposit = user.deposit + req.body.deposit;
            let ans = await model.update(req.body, {
              where: {
                id: req.body.id,
                deposit: deposit,
              },
            });
            if (ans) {
              res.status(200).json({
                message: "User update successfully",
              });
            } else {
              res.status(400).json({
                message: "User not found",
              });
            }
          } else {
            res.status(200).json({
              message: "this user not found",
            });
          }
        }
      } catch (e) {
        logger.error(`${e}`);
        res.status(500).send("error while update " + this.model_name);
      } finally {
        req.db.sequelize.close();
      }
    };
  };

  reset = () => {
    return async (req, res) => {
      try {
        const model = req.db[this.model_name];
        let user = await model.update(
          {
            deposit: 0,
          },
          {
            where: {
              id: req.params.id,
              role: ROLES[0],
            },
          }
        );
        if (user) {
          res.status(200).json({
            message: "User update successfully",
          });
        } else {
          res.status(200).json({
            message: "this user not found",
          });
        }
      } catch (e) {
        logger.error(`${e}`);
        res.status(500).send("error while update " + this.model_name);
      } finally {
        req.db.sequelize.close();
      }
    };
  };
}

module.exports = UserController;
