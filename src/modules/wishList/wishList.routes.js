import express from "express";
import * as wishListController from "./controllers/wishList.controller.js";
import {  protactRoutes } from "../auth/controllers/auth.controllers.js";
let wishListRouter = express.Router();


wishListRouter.patch("/",protactRoutes,wishListController.addInWishList)
wishListRouter.delete("/",protactRoutes,wishListController.deleteFromWish)
wishListRouter.get("/",protactRoutes,wishListController.getAllWishList)
  


export default wishListRouter;
