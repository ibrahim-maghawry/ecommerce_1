import productModel from "../../../../DB/model/product.model.js";
import slugify from "slugify";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import AppError from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/APIFeatuer.js";

//=========================START - addCategory ============================
const addProduct = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.image = req.files.image.map((ele) => ele.filename)
console.log({...req.body})
  const results = new productModel({ ...req.body });

  await results.save();
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - addCategory ============================

//=========================START - getAllProduct============================

const getAllProduct = catchAsyncError(async (req, res, next) => {

 let apiFeatur= new ApiFeatures(productModel.find(),req.query).pagination().filter().fields().search().sort()

  const results = await apiFeatur.moongoseQuery;
  console.log(results)
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", page:apiFeatur.page,results });
});


//=========================end - getAllCategory ============================



const getProductById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await productModel.findById(id);
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});


//=========================START - updateCategory ============================

const updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  if (req.body.title) {req.body.slug= slugify(title) };
  const results = await productModel.findByIdAndUpdate(id, { ...req.body },{new:true});
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - updateCategory ============================

//=========================START - deleteCategory ============================

const deleteProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await productModel.findByIdAndDelete(id);
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});
//=========================end - deleteCategory ============================

export {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
