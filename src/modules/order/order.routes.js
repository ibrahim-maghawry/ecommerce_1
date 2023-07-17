import express from "express";
import * as orderController from "./controllers/order.controller.js";
import {  protactRoutes } from "../auth/controllers/auth.controllers.js";
let orderRouter = express.Router();

orderRouter
   .route("/")
//   .post(protactRoutes, cartController.addtoCart)
   .get(protactRoutes,orderController.getOrder)
   .get(orderController.getAllOrder);

orderRouter
   .route("/:id")
//   .get(reviewController.getReviewById)
   // .put(protactRoutes,cartController.removeCartItem)
   .post(protactRoutes, orderController.createOrder)


orderRouter.post("/chekOut/:id",protactRoutes,orderController.onlinePayment)
   // cartRouter.patch("/:code",protactRoutes,cartController.applyCoupon)
export default orderRouter;
