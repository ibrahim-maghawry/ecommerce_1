import subCategoryRouter from './modules/subCategories/subCategories.routes.js'
import categoryRouter from './modules/categories/categories.routes.js'
import brandRouter from './modules/brands/brands.routes.js'
import productRouter from './modules/products/products.routes.js'
import userRouter from './modules/brands copy/user.routes.js'
import authUser from './modules/auth/auth.routes.js'
import reviewRouter from './modules/reviews/reviews.routes.js'
import wishListRouter from './modules/wishList/wishList.routes.js'

import AppError from './utils/AppError.js';
import globalError from './utils/globalErrorHandel.js';


export function init(app) {
    app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/subCategory", subCategoryRouter)
app.use("/api/v1/brand", brandRouter) 
app.use("/api/v1/product", productRouter) 
app.use("/api/v1/user", userRouter) 
app.use("/api/v1/auth", authUser) 
app.use("/api/v1/review", reviewRouter) 
app.use("/api/v1/wishList", wishListRouter) 
    
app.use('*', ( req, res, next) => {
    next(new AppError(`error in path ${req.originalUrl}`,404)) 
})

app.use(globalError)
}