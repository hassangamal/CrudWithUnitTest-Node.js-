const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { Product } = require("../common/model_names.js");
const productController = new ProductController(Product);
const connectionMiddleware = require("../middlewares/dbConnection.js");

router.get("/api/products", [connectionMiddleware], productController.read());

router.get(
  "/api/product/:id",
  [connectionMiddleware],
  productController.findById()
);

router.post("/api/product", [connectionMiddleware], productController.create());

router.post(
  "/api/deleteProduct",
  [connectionMiddleware],
  productController.deleteProduct()
);

router.put(
  "/api/product",
  [connectionMiddleware],
  productController.updateProduct()
);

router.post("/api/buy", [connectionMiddleware], productController.buy());

module.exports = router;
