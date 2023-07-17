import categoryModel from "../../../../DB/model/category.model.js";
import slugify from "slugify";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import AppError from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/APIFeatuer.js";





//=========================START - addCategory ============================
const addCategory = catchAsyncError(async (req, res, next) => {
 
  req.body.slug = slugify(req.body.name)
  req.body.image=req.file.filename


  const results = new categoryModel(req.body );
  await results.save();
  !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done", results });
})




//=========================end - addCategory ============================




//=========================START - getAllCategory ============================

const getAllCategory = catchAsyncError(async (req, res, next) => {
  let apiFeatur= new ApiFeatures(categoryModel.find(),req.query).pagination().filter().fields().search().sort()

  const results = await apiFeatur.moongoseQuery;
  !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done",  page:apiFeatur.page,results });})








const getCategoryById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await categoryModel.findById(id);
  !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done", results });
 
})


//=========================end - getAllCategory ============================







//=========================START - updateCategory ============================

const updateCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const results = await categoryModel.findById(id, {name,slug:slugify(name)});
  !results && next(new AppError("not found",500))
  results && res.status(201).json({ msg: "done", results });
  
 
})


//=========================end - updateCategory ============================



//=========================START - deleteCategory ============================

const deleteCategory =catchAsyncError( async (req, res, next) => {
  const { id } = req.params;
   const results = await categoryModel.findByIdAndDelete(id);
   !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done", results });
  
})
//=========================end - deleteCategory ============================

export {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
