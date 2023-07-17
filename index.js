import express from 'express'
import dotenv from "dotenv";
import { dbConnection } from "./DB/dbConnection.js"
import categoryRouter from './src/modules/categories/categories.routes.js'
import subCategoryRouter from './src/modules/subCategories/subCategories.routes.js'
import brandRouter from './src/modules/brands/brands.routes.js'
import productRouter from './src/modules/products/products.routes.js'
import userRouter from './src/modules/brands copy/user.routes.js'
import authUser from './src/modules/auth/auth.routes.js'
import reviewRouter from './src/modules/reviews/reviews.routes.js'
import wishListRouter from './src/modules/wishList/wishList.routes.js'
import couponeRouter from './src/modules/coupones/coupon.routes.js'
import cartRouter from './src/modules/carts/cart.routes.js'
import morgan from 'morgan';
import AppError from './src/utils/AppError.js';
import globalError from './src/utils/globalErrorHandel.js';
import { uploadSingleFile } from './src/middleware/fileUpload.js';
import cors from "cors"
import orderRouter from './src/modules/order/order.routes.js';
dotenv.config()
const app = express()
const port =3000
app.use(cors())
app.use(express.static("uploadS"))//3shan yshof 2lfiles static
app.use(express.json())
app.use(express.urlencoded({extended:true}))//3shan y2ra mn el form data
app.use(morgan('dev'))//how API works in terminal
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/subCategory", subCategoryRouter)
app.use("/api/v1/brand", brandRouter) 
app.use("/api/v1/product", productRouter) 
app.use("/api/v1/user", userRouter) 
app.use("/api/v1/auth", authUser) 
app.use("/api/v1/review", reviewRouter) 
app.use("/api/v1/wishList", wishListRouter) 
app.use("/api/v1/coupone", couponeRouter) 
app.use("/api/v1/cart", cartRouter) 
app.use("/api/v1/order", orderRouter) 

app.use('*', ( req, res, next) => {
    next(new AppError(`error in path ${req.originalUrl}`,404))
})

app.use(globalError)
app.get('/', (req, res) => res.send('Hello World!'))


dbConnection()

app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))