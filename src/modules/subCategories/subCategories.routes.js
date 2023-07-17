import express from "express";
import { uploadSingleFile } from "../../middleware/fileUpload.js";

import * as SubCategoryController from "./controllers/subCategories.js";
const Router = express.Router({mergeParams:true});

Router.route("/")
  .get(SubCategoryController.getAllSubCategory)
  .post(uploadSingleFile("subCategory", "image"), SubCategoryController.addSubCategory);

Router.route("/:id")
  .get(SubCategoryController.getSubCategoryById)
  .put(SubCategoryController.updateSubCategory)
  .delete(SubCategoryController.deleteSubCategory);

export default Router;
