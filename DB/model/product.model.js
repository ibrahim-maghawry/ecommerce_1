import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "title is required"],
      trim: true,
      required: [true,"product title is required"],
      minLength: [2, "too short product name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
        },
    price: {
        type: Number,
        required: [true, "pruduct price is required"],
        min:0
        },
        priceAfterDiscount: {
            type: Number,
            min:0
    },
        ratingAvg: {
            type: Number,
            min: [1, 'rating average most be greater than 1'],
            max:[5,'rating average most be less than 5']
        },
        ratingCount: {
            type: Number,
            default: 0,
            min:0
        },
        description: {
            type: String,
            minLength: [5, "too short descripition"],
            maxLenght: [300, "too long product descripition"],
            trim:true
        },
        quantity: {
            type: Number,
            required: [true, 'pruduct quantity is required'],
            min: 0,
            default:0
        },
        sold: {
            type: Number,
            default: 0,
            min:0
        },

        imageCover: String,
        image: [String],
        
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'category',
            required:[true,"product category required"]
        },
        subCategory: {
            type: mongoose.Types.ObjectId,
            ref: 'subCategory',
            required:[true,"product subCategory required"]
        },
        brand: {
            type: mongoose.Types.ObjectId,
            ref: 'brand',
            required:[true,"product brand required"]
        },
    },
  
  { timestamps: true ,toJSON: { virtuals: true },toObject:{ virtuals: true }}
);
productSchema.virtual('productReviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
  });

productSchema.pre(/^find/, function () {
      this.populate('productReviews')
  })
productSchema.post('init', (doc) => {
     doc.imageCover = `${process.env.BASE_URL}product/${doc.imageCover}`
  if (doc.image) { doc.image = doc.image.map(ele => `${process.env.BASE_URL}product/${ele}`) }
    
  })

const productModel = mongoose.model("product", productSchema);

export default productModel;
