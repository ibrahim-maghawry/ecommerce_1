import { userModel } from "../../../../DB/model/user.model.js";
import AppError from "../../../utils/AppError.js";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { changePassword } from "../../brands copy/controllers/user.controller.js";

const signUp = catchAsyncError(async (req, res, next) => {
    const {email}=req.body
    const _email = await userModel.findOne({email})
    if (_email) return next(new AppError("email already exit", 409))
  
    req.body.profilePic = req.file.filename;
    const results = new userModel(req.body);
    await results.save();
    !results && next(new AppError("not found", 500));
    results && res.status(201).json({ msg: "done", results });
})

const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    const _email = await userModel.findOne({email})
    if (!_email) return next(new AppError("email not found", 409))
  
    const _match =await bcrypt.compare(password,_email.password)
    if (_email && _match) {
        let token =jwt.sign({name:_email.name,userId:_email._id,role:_email.role},"ibrahim")
        return res.status(201).json({msg:"done",token})
    }
    next(new AppError("wrong passord", 401))
})



export const protactRoutes = catchAsyncError(async (req, res, next) => {
    let { token } = req.headers
    if (!token) return next(new AppError("please provide token", 401))
    
    let decoded = await jwt.verify(token, "ibrahim")
    console.log(decoded)


    const user = await userModel.findById(decoded.userId)
    if(!user) return next(new AppError("user not found", 400))
    if (user.cahngePasswordAt) {
    
        let changePasswordTime = parseInt(user.cahngePasswordAt.getTime() / 1000)
        if (changePasswordTime>decoded.iat) return next(new AppError("invalid token ", 401))
}
 req.id=decoded.userId
    req.user= user
next()
})


export const allowTo = (...roles) => {
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) return next(new AppError("not authrized", 403))
    next()
    })
}

export{signUp,signIn}