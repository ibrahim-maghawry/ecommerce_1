import express from "express";
import * as userController from "./controllers/user.controller.js";
import { uploadSingleFile } from "../../middleware/fileUpload.js";
const Router = express.Router();

Router.route("/")
  .get(userController.getAllUsers)
  .post(uploadSingleFile("user","profilePic"),userController.addUser);

Router.route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  

Router.patch("/changePass/:id", userController.changePassword);

export default Router;
