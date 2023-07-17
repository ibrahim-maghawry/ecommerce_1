import express from "express";
import * as productController from "./controllers/products.controller.js";
import { uploadMixFiles } from "../../middleware/fileUpload.js";
import { allowTo, protactRoutes } from "../auth/controllers/auth.controllers.js";
const Router = express.Router();

Router.route("/")
  .get(productController.getAllProduct)
  .post(protactRoutes,allowTo("user"),
    uploadMixFiles("product", [
      { name: "imageCover", maxCount: 1 },
      { name: "image", maxCount: 8 },
    ]),
    productController.addProduct
  );

Router.route("/:id")
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

export default Router;
