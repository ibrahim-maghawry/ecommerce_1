import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref:"user"
    },
    cartItems: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref:"product"
            },
            quantity: {
                type: Number,
                default:1
            },
            price:Number
        },
    ],
    totalOrderPrice: Number,
    discount: Number,
    totalPriceAfterDiscount: Number,
    paymentMethod: {
        type: String,
        enums: ["cash", "credit"],
        default:"cach",
    },
    shippingAddress: {
        city: String,
        street:String
    },
    isPaid: Boolean,
    paidAt: Date,
    isDeleviried:Boolean,
}, { timestamps: true })


export const orderModel= mongoose.model('order',orderSchema) 