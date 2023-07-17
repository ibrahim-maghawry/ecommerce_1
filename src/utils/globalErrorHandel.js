const globalError = (err, req, res, next) => {
    let code = err.statusCode || 500
    console.log(err)
    res.status(code).json({msg:"error in global",err:err.message})
}


export default globalError