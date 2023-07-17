import {userModel} from "../../../../DB/model/user.model.js";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import AppError from "../../../utils/AppError.js";



//=========================START - addInWishList ============================

const addInWishList= catchAsyncError( async (req, res, next) => {
  let { id } = req.body

  let results = await userModel.findByIdAndUpdate(req.id , {
    $addToSet:{wishList:id},
  }, {
    new: true
  });

  !results && next(new AppError(" not found", 500));
  results && res.status(201).json({ msg: "done", results });
});


//=========================end - addInWishList ============================

//=========================START - deleteFromWish ============================


const deleteFromWish= catchAsyncError( async (req, res, next) => {
  let { id } = req.body

  let results = await userModel.findByIdAndUpdate(req.id , {
    $pull:{wishList:id},
  }, {
    new: true
  });

  !results && next(new AppError(" not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - deleteFromWish ============================

//=========================START - deleteFromWish ============================


const getAllWishList= catchAsyncError( async (req, res, next) => {

  let results = await userModel.findOne({ _id:req.id } );

  !results && next(new AppError(" not found", 500));
  results && res.status(201).json({ msg: "done", results:results.wishList });
});

//=========================end - deleteFromWish ============================




export { addInWishList ,deleteFromWish,getAllWishList};
 