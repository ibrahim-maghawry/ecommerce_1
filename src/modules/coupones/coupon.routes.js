import express from "express";
import * as copouneController from "./controllers/coupon.controller.js";
import {  protactRoutes } from "../auth/controllers/auth.controllers.js";
let copouneRoutes  = express.Router();

copouneRoutes
  .route("/")
  .get(copouneController.getAllcoupons)
  .post(protactRoutes,copouneController.createCoupon);

  copouneRoutes
  .route("/:id")
  .get(copouneController.getCopounById)
  .put(copouneController.updateCoupon)
  .delete(copouneController.deleteCopoun);

export default copouneRoutes;
