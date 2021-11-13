const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { User } = require("../common/model_names.js");
const userController = new UserController(User);
const connectionMiddleware = require("../middlewares/dbConnection.js");

router.get("/api/users", [connectionMiddleware], userController.read());

router.get("/api/user/:id", [connectionMiddleware], userController.findById());

router.post("/api/user", [connectionMiddleware], userController.createUser());

router.put("/api/user", [connectionMiddleware], userController.update());

router.delete("/api/user/:id", [connectionMiddleware], userController.delete());

router.post("/api/deposit", [connectionMiddleware], userController.addDeposit());

router.get("/api/reset/:id", [connectionMiddleware], userController.reset());

module.exports = router;
