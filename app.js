const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const logger = require("./utils/logger.js");
const PORT = process.env.SERVER_PORT || 1234;

const productRouter = require("./api/product_routes.js");
const userRouter = require("./api/user_routes.js");

const loggerMiddleware = require("./middlewares/logger.js");

app.use(express.urlencoded({ extended: true, limit: process.env.MAX_PAYLOAD }));
app.use(express.json({ limit: process.env.MAX_PAYLOAD }));
app.use(loggerMiddleware);

app.use(productRouter);
app.use(userRouter);

app.listen(PORT, async () => {
  logger.info(`app listening at port ${PORT} `);
});

module.exports = app;
