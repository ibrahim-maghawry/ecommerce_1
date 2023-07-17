import express from "express";
import * as cartController from "./controllers/cart.controller.js";
import {  protactRoutes } from "../auth/controllers/auth.controllers.js";
let cartRouter = express.Router();

cartRouter
  .route("/")
  .post(protactRoutes, cartController.addtoCart)
  .get(protactRoutes,cartController.getCart);

  cartRouter
   .route("/:id")
//   .get(reviewController.getReviewById)
   .put(protactRoutes,cartController.removeCartItem)
   .post(protactRoutes, cartController.updateCart)


   cartRouter.patch("/:code",protactRoutes,cartController.applyCoupon)
export default cartRouter;
