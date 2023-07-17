import express from "express";
import * as reviewController from "./controllers/reviews.controller.js";
import {  protactRoutes } from "../auth/controllers/auth.controllers.js";
let reviewsRouter = express.Router();

reviewsRouter
  .route("/")
  .get(reviewController.getAllReviews)
  .post(protactRoutes,reviewController.addReview);

reviewsRouter
  .route("/:id")
  .get(reviewController.getReviewById)
  .put(protactRoutes,reviewController.updateReview)
  .delete(reviewController.deleteReview);

export default reviewsRouter;
