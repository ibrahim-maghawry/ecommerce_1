import slugify from "slugify";
import { userModel } from "../../../../DB/model/user.model.js";
import ApiFeatures from "../../../utils/APIFeatuer.js";
import AppError from "../../../utils/AppError.js";
import catchAsyncError from "../../../utils/catchAsyncError.js";

userModel;

//=========================START - addCategory ============================
const addUser = catchAsyncError(async (req, res, next) => {
  const {email}=req.body
  const _email = await userModel.findOne({email})
  if (_email) return next(new AppError("email already exit", 400))

  req.body.profilePic = req.file.filename;
  const results = new userModel(req.body);
  await results.save();
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - addCategory ============================

//=========================START - getAllCategory ============================

const getAllUsers = catchAsyncError(async (req, res, next) => {
  let apiFeatur = new ApiFeatures(userModel.find(), req.query)
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

//=========================START - getUserById ============================

const getUserById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await userModel.findById(id);
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - getUserById ============================

//=========================START - updateCategory ============================

const updateUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  
  
  const results = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - updateCategory ============================

//=========================START - deleteCategory ============================

const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const results = await userModel.findByIdAndDelete(id);
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});
//=========================end - deleteCategory ============================

const changePassword = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  
  req.body.cahngePasswordAt=Date.now()
  
  const results = await userModel.findOneAndUpdate({_id: id}, req.body, {
    new: true,
  });
  !results && next(new AppError("not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

export { addUser, getAllUsers, getUserById, updateUser, deleteUser ,changePassword};

