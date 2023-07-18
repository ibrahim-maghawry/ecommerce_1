import { cartModel } from "../../../../DB/model/cart.model.js";
import { orderModel } from "../../../../DB/model/order.model.js";
import productModel from "../../../../DB/model/product.model.js";
import catchAsyncError from "../../../utils/catchAsyncError.js";
import AppError from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/APIFeatuer.js";
import { couponModel } from "../../../../DB/model/coupon.model.js";
import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51NUkT0Hq5LHQvaj4HvGfOxkigpwdFJKOB38FuLngsLBKSJuPrLsdZX9tYGlPTht06rSaDWvNd6MNGMLsRTdwFDJ800YpM6kPIu");


//=========================START - createOrder ============================
const createOrder = catchAsyncError(async (req, res, next) => {
  let cart = await cartModel.findOne({ _id: req.params.id });
  !cart && next(new AppError("cart not found", 500));
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  let order = new orderModel({
    user: req.id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  if (order) {
    let options = cart.cartItems.map((ele) => ({
      updateOne: {
        filter: { _id: ele.product },
        update: { $inc: { quantity: -ele.quantity, sold: ele.quantity } },
      },
    }));
    await productModel.bulkWrite(options);
    await order.save();
  }

  await cartModel.findByIdAndDelete(req.params.id);
  !order && next(new AppError("cart not found", 500));
  order && res.status(201).json({ msg: "done", order });
});

//=========================end - createOrder ============================

//=========================START - getOrder ============================

const getOrder = catchAsyncError(async (req, res, next) => {
  let order = await orderModel.findOne({ user: req.id }).populate("cartItems.product");
  !order && next(new AppError("not found", 500));
  order && res.status(201).json({ msg: "done", order });
});

//=========================end - getOrder ============================

//=========================START - getAllOrder ============================

const getAllOrder = catchAsyncError(async (req, res, next) => {
  let order = await orderModel.find({  });
  !order && next(new AppError("not found", 500));
  order && res.status(201).json({ msg: "done", order });
});

//=========================end - getAllOrder ============================

//=========================START - removeCartItem ============================

const onlinePayment = catchAsyncError(async (req, res, next) => {
  let cart = await cartModel.findOne({ _id: req.params.id });
  !cart && next(new AppError("cart not found", 500));
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  
  
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name:req.user.name
          }
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://route-comm.netlify.app/#/",
    cancel_url: "https://route-comm.netlify.app/#/cart",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata:req.body.shippingAddress
    
  })
  !session && next(new AppError("error in session", 500));
  session && res.status(201).json({ msg: "done", session });
})




//=========================START - removeCartItem ============================





const createOnlineOrder = catchAsyncError( (request, response) => {
    const sig = request.headers['stripe-signature'].toString()
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, "whsec_pDG9AZQVVifl4nGutmy2NWfWsKDNsnyW");
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
  
  if (event.type == 'checkout.session.completed') {
    const checkoutSessionCompleted = event.data.object;

    console.log("create order here . . . . ");
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }
   
  
    
  }
)


export { createOrder,getOrder ,getAllOrder,onlinePayment,createOnlineOrder};
