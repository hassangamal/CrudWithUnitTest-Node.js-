const logger = require("../utils/logger.js");
const { generateHash } = require("../utils/encrypt.js");

class BaseController {
  constructor(model_name) {
    this.model_name = model_name;
  }

  read = () => {
    return async (req, res) => {
      try {
        const model = req.db[this.model_name];
        const ans = await model.findAll();
        return res.json(ans);
      } catch (e) {
        logger.error(`${e}`);
        res.status(500).send("error while fetching" + this.model_name);
      } finally {
        req.db.sequelize.close();
      }
    };
  };

  create = () => {
    return async (req, res) => {
      try {
        const model = req.db[this.model_name];

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

  update = () => {
    return async (req, res) => {
      try {
        const model = req.db[this.model_name];
        const ans = await model.update(req.body, {
          where: {
            id: req.body.id,
          },
          returning: true,
        });
        return res.status(200).send(" updated successfully");
      } catch (e) {
        logger.error(`${e}`);
        res.status(500).send("error while updating" + this.model_name);
      } finally {
        req.db.sequelize.close();
      }
    };
  };

  delete = () => {
    return async (req, res) => {
      try {
        const model = req.db[this.model_name];
        let ans = await model.destroy({
          where: {
            id: req.params.id,
          },
        });
        if (ans) {
          return res.send(`${this.model_name} deleted successfully`);
        } else {
          return res.send(`${this.model_name} already deleted`);
        }
      } catch (e) {
        logger.error(`${e}`);
        res.status(500).send("error while deleting " + this.model_name);
      } finally {
        req.db.sequelize.close();
      }
    };
  };

  findById = () => {
    return async (req, res) => {
      try {
        const model = req.db[this.model_name];
        const ans = await model.findByPk(req.params.id);
        return res.json(ans);
      } catch (e) {
        logger.error(`${e}`);
        res.status(500).send("error while fetching" + this.model_name);
      } finally {
        req.db.sequelize.close();
      }
    };
  };
}

module.exports = BaseController;
