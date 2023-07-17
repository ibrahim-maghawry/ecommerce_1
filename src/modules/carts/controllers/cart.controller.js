import {cartModel} from "../../../../DB/model/cart.model.js";
import productModel from "../../../../DB/model/product.model.js";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import AppError from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/APIFeatuer.js";
import { couponModel } from "../../../../DB/model/coupon.model.js";

function calcPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((ele) => {
    totalPrice += ele.quantity * ele.price
    
  })
    
  cart.totalPrice=totalPrice;
}
//=========================START - addtoCart ============================
const addtoCart = catchAsyncError(async (req, res, next) => {

  let _product = await productModel.findById(req.body.product)
 
   !_product && next(new AppError("not found", 500)); 
  req.body.price= _product.price

  const isExist = await cartModel.findOne({ user: req.id })
  if (!isExist) {
    let cart = new cartModel({
      user: req.id,
      cartItems: [req.body]
    })
    calcPrice(cart)
    await cart.save()
    cart && res.status(201).json({ msg: "done", cart }); 

  } 
    let item = isExist.cartItems.find((ele) => ele.product == req.body.product)
    if (item) {
      item.quantity+=1
    } else {
      isExist.cartItems.push(req.body)
  }
  
  calcPrice(isExist)

  await isExist.save()
  res.status(201).json({ msg: "done",isExist });

});

//=========================end - addtoCart ============================
 
//=========================START - getCart ============================

const getCart = catchAsyncError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.id })
  cart && res.status(201).json({ msg: "done", cart }); 
  !cart && next(new AppError("not found", 500));
});

//=========================end - getCart ============================


//=========================START - removeCartItem ============================

const removeCartItem = catchAsyncError(async (req, res, next) => {
  let results = await cartModel.findOneAndUpdate({ user: req.id }, { $pull: {cartItems:{ _id:req.params.id } }
},{new:true})
  !results && next(new AppError("cart not found", 500));
  results && res.status(201).json({ msg: "done", results });
});

//=========================end - removeCartItem ============================

//=========================START - updateCart ============================

const updateCart = catchAsyncError(async (req, res, next) => {

  let _product = await productModel.findById(req.params.id)
 
   !_product && next(new AppError("not found", 500)); 
  req.body.price= _product.price

  const isExist = await cartModel.findOne({ user: req.id })
  

  let item = isExist.cartItems.find((ele) => ele.product == req.body.product)
    !item && next(new AppError("cart not found", 500));
  if (item) {
    item.quantity = req.body.quantity
  }
  
  calcPrice(isExist)

  await isExist.save()
  res.status(201).json({ msg: "done",isExist });

});
//=========================end - updateCart ============================


//=========================START - updateCart ============================

const applyCoupon = catchAsyncError(async (req, res, next) => {
  

  let code = await couponModel.findOne({ code: req.params.code });
  !code && next(new AppError("code not found", 500));

  let cart = await cartModel.findOne({ user: req.id })
  !cart && next(new AppError("cart not found", 500));

    cart.totalPriceAfterDiscount=cart.totalPrice - (cart.totalPrice*code.discounte)/100
 
  cart.discount = code.discounte
   
  await cart.save();
  !cart && next(new AppError("error", 500));
  cart && res.status(201).json({ msg: "done", cart });

})


//=========================end - updateCart ============================


export { addtoCart,getCart ,removeCartItem,updateCart,applyCoupon};
 