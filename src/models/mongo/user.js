// import Mongoose from "mongoose";
// const { Schema } = Mongoose;
import { Schema, model } from "mongoose";
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    userType: String,
});
export const UserMongoose = model("User", userSchema);
