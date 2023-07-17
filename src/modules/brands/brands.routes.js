import express from "express";
import * as brandController from "./controllers/brands.controller.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";
const Router = express.Router();

Router.route("/")
  .get(brandController.getAllBrands)
  .post(uploadSingleFile("brand","logo"),brandController.addBrand);

Router.route("/:id")
  .get(brandController.getBrandById)
  .put(brandController.updateBrand)
  .delete(brandController.deleteBrand);

export default Router;
