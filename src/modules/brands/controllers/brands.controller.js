import brandModel from "../../../../DB/model/brand.model.js";
import slugify from "slugify";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import AppError from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/APIFeatuer.js";





//=========================START - addCategory ============================
const addBrand = catchAsyncError(async (req, res, next) => {


  req.body.slug = slugify(req.body.name)
  req.body.logo=req.file.filename
  const results = new brandModel(req.body);
  await results.save();
  !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done", results });
})




//=========================end - addCategory ============================




//=========================START - getAllCategory ============================

const getAllBrands= catchAsyncError(async (req, res, next) => {
  let apiFeatur= new ApiFeatures(brandModel.find(),req.query).pagination().filter().fields().search().sort()

  const results = await apiFeatur.moongoseQuery;
  !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done", page:apiFeatur.page,results });})



  //=========================end - getAllCategory ============================




//=========================START - getBrandById ============================

const getBrandById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await brandModel.findById(id);
  !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done", results });
 
})




  //=========================end - getBrandById ============================





//=========================START - updateCategory ============================

const updateBrand = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.name)
  if (req.file) { req.body.logo = req.file.filename }
  const results = await brandModel.findByIdAndUpdate(id,req.body,{new:true});
    !results && next(new AppError("not found",500))
  results && res.status(201).json({ msg: "done", results });
  
 
})


//=========================end - updateCategory ============================



//=========================START - deleteCategory ============================

const deleteBrand =catchAsyncError( async (req, res, next) => {
  const { id } = req.params;
   const results = await brandModel.findByIdAndDelete(id);
   !results && next(new AppError("not found",500))
  results &&  res.status(201).json({ msg: "done", results });
  
})
//=========================end - deleteCategory ============================

export {
  addBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
