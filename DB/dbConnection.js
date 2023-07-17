import mongoose from "mongoose";


mongoose.set('strictQuery', true);


export const dbConnection = async () => {
    return await mongoose.connect("mongodb+srv://ibrahim_mo:hYZKTSl1iIOptSmA@cluster0.78qodov.mongodb.net/ecommerce").then(() => {
        console.log("DB connection successfuly");
    }).catch((err) => {
        console.log({ msg: "error in connection", err });
    })
}
