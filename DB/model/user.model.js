import mongoose from "mongoose";
import bcrypt from 'bcrypt'



const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'user name required'],
        minLength:[1,'too short user name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email is requird'],
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: true,
        minLength:[8,'minLength 8 charcaters']
    },
    phone: {
        type: Number,
        required: [true, 'email is requird']
    },
    profilePic: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default:"user"
    },
    isActive: {
        type: Boolean,
        default:false
    },
    verified: {
        type: Boolean,
        default:false
    }, cahngePasswordAt: Date,
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref:'product'
    }]

}, { timestamps: true })

userSchema.pre('save', function () {
   this.password=bcrypt.hashSync(this.password,7)
})

userSchema.pre(/^findOneAndUpdate/, function () {
    // this._update.password=bcrypt.hashSync(this._update.password,7)
 })


userSchema.post('init', (doc) => {
    doc.profilePic=`${process.env.BASE_URL}user/${doc.profilePic}`
  })
export const userModel = mongoose.model('user', userSchema)
