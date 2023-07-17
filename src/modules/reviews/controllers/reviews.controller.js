import reviewModel from "../../../../DB/model/review.model.js";
import slugify from "slugify";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import AppError from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/APIFeatuer.js";

//=========================START - addCategory ============================
const addReview = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id
  const review = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
  if (review) return next(new AppError("review alraedy exist",409))
  const _results = new reviewModel(req.body);
 let results=await _results.save();
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - addCategory ============================
 
//=========================START - getAllCategory ============================

const getAllReviews = catchAsyncError(async (req, res, next) => {
  let apiFeatur = new ApiFeatures(reviewModel.find(), req.query)
    .pagination()
    .filter()
    .fields()
    .search()
    .sort();

  const results = await apiFeatur.moongoseQuery;
  !results && next(new AppError("not found", 500)); 
  results &&
    res.status(201).json({ msg: "done", page: apiFeatur.page, results });
});

//=========================end - getAllCategory ============================

//=========================START - getReviewById ============================

const getReviewById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await reviewModel.findOne({_id:id});
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results }); 
});

//=========================end - getReviewById ============================

//=========================START - updateCategory ============================

const updateReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  
  const results = await reviewModel.findOneAndUpdate({_id:id,user:req.user._id}, req.body, {
    new: true,
  });
  !results && next(new AppError("review not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - updateCategory ============================

//=========================START - deleteCategory ============================

const deleteReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await reviewModel.findByIdAndDelete(id);
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});
//=========================end - deleteCategory ============================

export { addReview, getAllReviews, getReviewById, updateReview, deleteReview };
 