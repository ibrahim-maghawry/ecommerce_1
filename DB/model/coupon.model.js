import mongoose from "mongoose";


const couponSchema = mongoose.Schema({
    code: {
        type: String,
        trim: true,
        required: [true, "coupon is required"],
        unique:true
    },
    discounte: {
        type: Number,
        min: 0,
        required:[true,"coupon discounte required"]
    },
    expiers: {
        type: String,
        required:[true,'copoun code is required']
    }
},{ timestamps: true })

export const couponModel=mongoose.model('coupon',couponSchema)