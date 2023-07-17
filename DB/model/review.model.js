import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      required: true,
      index:true
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      index:true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      index:true
    },
    ratingAvg: {
      type: Number,
      min: [1, 'rating average most be greater than 1'],
      max: [5, 'rating average most be less than 5'],
      index:true
  },
  },
  { timestamps: true }
);

reviewSchema.pre(['find','findOne'], function () {
  this.populate('user','name')
})

const reviewModel = mongoose.model("review", reviewSchema);

export default reviewModel;
