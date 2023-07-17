import {couponModel} from "../../../../DB/model/coupon.model.js";
 import catchAsyncError from "../../../utils/catchAsyncError.js";
import AppError from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/APIFeatuer.js";
import QRCode from "qrcode"
//=========================START - createCoupon ============================
const createCoupon = catchAsyncError(async (req, res, next) => {
 
  const _results = new couponModel(req.body);
  let results=await _results.save();
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - createCoupon ============================
 
//=========================START - getAllcoupons ============================

const getAllcoupons = catchAsyncError(async (req, res, next) => {
  let apiFeatur = new ApiFeatures(couponModel.find(), req.query)
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

//=========================end - getAllcoupons ============================

//=========================START - getCopounById ============================

const getCopounById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await couponModel.findOne({ _id: id });
  let url =await QRCode.toDataURL(results.code)

  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results ,qrCodeURL:url}); 
});

//=========================end - getCopounById ============================

//=========================START - updateCoupon ============================

const updateCoupon= catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  
  const results = await couponModel.findOneAndUpdate({_id:id}, req.body, {
    new: true,
  });
  !results && next(new AppError("coupon not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - updateCoupon ============================

//=========================START - deleteCopoun ============================

const deleteCopoun = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await couponModel.findByIdAndDelete(id);
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});
//=========================end - deleteCopoun ============================

export { createCoupon, getAllcoupons,getCopounById,updateCoupon,deleteCopoun };
 