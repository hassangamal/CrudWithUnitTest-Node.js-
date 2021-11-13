const logger = require("../utils/logger.js");
const BaseController = require("./BaseController.js");
const { User } = require("../common/model_names.js");
const { ROLES } = require("../common/enums.js");
const { Op } = require("sequelize");

class ProductController extends BaseController {
  deleteProduct = () => {
    return async (req, res) => {
      try {
        const product_model = req.db[this.model_name];
        const user_model = req.db[User];

        let user = await user_model.findOne({
          where: {
            id: req.body.sellerId,
            role: ROLES[1],
          },
        });
        if (user) {
          let ans = await product_model.destroy({
            where: {
              id: req.body.productId,
              sellerId: req.body.sellerId,
            },
          });
          if (ans) {
            res.status(200).json({
              message: "Product deleted successfully",
            });
          } else {
            res.status(400).json({
              message: "Product not found",
            });
          }
        } else {
          res.status(200).json({
            message: "this user not found",
          });
        }
      } catch (e) {
        logger.error(`${e}`);
        res.status(500).send("error while deleting " + this.model_name);
      } finally {
        req.db.sequelize.close();
      }
    };
  };

  updateProduct = () => {
    return async (req, res) => {
      try {
        const product_model = req.db[this.model_name];
        const user_model = req.db[User];

        let user = await user_model.findOne({
          id: req.body.sellerId,
          role: ROLES[1],
        });
        if (user) {
          let ans = await product_model.update(req.body, {
            where: {
              id: req.body.id,
            },
          });
          if (ans) {
            res.status(200).json({
              message: "Product update successfully",
            });
          } else {
            res.status(400).json({
              message: "Product not found",
            });
          }
        } else {
          res.status(200).json({
            message: "this user not found",
          });
        }
      } catch (e) {
        logger.error(`${e}`);
        res.status(500).send("error while deleting " + this.model_name);
      } finally {
        req.db.sequelize.close();
      }
    };
  };

  buy = () => {
    return async (req, res) => {
      try {
        const product_model = req.db[this.model_name];
        let ans = await product_model.findOne({
          where: {
            id: req.body.productId,
            amountAvailable: {
              [Op.gte]: req.body.amountOfProducts,
            },
          },
        });
        if (ans) {
          const value = ans.amountAvailable - req.body.amountOfProducts;
          let response = await product_model.update(
            {
              id: req.body.productId,
              amountAvailable: value,
            },
            {
              where: {
                id: req.body.productId,
              },
            }
          );
          if (response) {
            res.status(200).json({
              message: "Product updated successfully",
            });
          } else {
            res.status(400).json({
              message: "Product not found",
            });
          }
        } else {
          res.status(400).json({
            message: "Product not found",
          });
        }
      } catch (e) {
        logger.error(`${e}`);
        res.status(500).send("error while updated " + this.model_name);
      } finally {
        req.db.sequelize.close();
      }
    };
  };
}

module.exports = ProductController;
