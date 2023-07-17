import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    logo: String,
  },
  { timestamps: true }
);


brandSchema.post('init', (doc) => {
  doc.image=`${process.env.BASE_URL}brand/${doc.logo}`
})
const brandModel = mongoose.model("brand", brandSchema);

export default brandModel;
