import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
        },
    
    category: {
            type: mongoose.Types.ObjectId,
            ref:"category"
    },
    image: String,
  },
  { timestamps: true }
);
subCategorySchema.post('init', (doc) => {
  doc.image=`${process.env.BASE_URL}subCategory/${doc.image}`
})
const subCategoryModel = mongoose.model("subCategory", subCategorySchema);

export default subCategoryModel;
