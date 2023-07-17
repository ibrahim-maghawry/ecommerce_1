import express from "express";
import subCategoryRouter from "../subCategories/subCategories.routes.js";
import * as categoryController from "./controllers/categories.controller.js";
import { validation } from "../../middleware/validation.js";
import {
  addCategorySchema,
  getCategoryByIdSchema,
} from "./category.validation.js";

import { uploadSingleFile } from "../../middleware/fileUpload.js";
const Router = express.Router();

Router.use("/:id/subCategory", subCategoryRouter);


Router.route("/")
  .get(categoryController.getAllCategory)
  .post(
    uploadSingleFile("category","image"),
    validation(addCategorySchema),
    categoryController.addCategory
  );

Router.route("/:id")
  .get(validation(getCategoryByIdSchema), categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default Router;
