import subCategoryModel from "../../../../DB/model/subCategory.model.js";
import slugify from "slugify";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import AppError from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/APIFeatuer.js";





//=========================START - addCategory ============================
const addSubCategory = catchAsyncError(async (req, res, next) => {
  req.body.categoryId = req.body.category;
  req.body.slug = slugify(req.body.name)
  req.body.image=req.file.filename

  const results = new subCategoryModel(req.body);
  await results.save();
  !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done", results });
})




//=========================end - addCategory ============================




//=========================START - getAllCategory ============================

const getAllSubCategory = catchAsyncError(async (req, res, next) => {
  let filter = {}
  if (req.params&&req.params.id) return filter={category:req.params.id}
  let apiFeatur= new ApiFeatures(subCategoryModel.find(filter),req.query).pagination().filter().fields().search().sort()

  const results = await apiFeatur.moongoseQuery;
  !results && next(new AppError("not found",500))
  results && res.status(201).json({ msg: "done",page:apiFeatur.page, results });
})
  

//=========================end - getAllCategory ============================
//=========================START - getSubCategoryById ============================

const getSubCategoryById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await subCategoryModel.findById(id);
  !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done", results });
 
})


//=========================end - getSubCategoryById ============================







//=========================START - updateCategory ============================

const updateSubCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const {name,categoryId} = req.body
  const results = await subCategoryModel.findById(id,{name,slug:slugify(name),category:categoryId});
  !results && res.status(500).json({ msg: "not found" })
  results && res.status(201).json({ msg: "done", results });
  
 
})


//=========================end - updateCategory ============================



//=========================START - deleteCategory ============================

const deleteSubCategory =catchAsyncError( async (req, res, next) => {
  const { id } = req.params;
   const results = await subCategoryModel.findByIdAndDelete(id);
   !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done", results });
  
})
//=========================end - deleteCategory ============================

export {
  addSubCategory,
  getAllSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
