// import Mongoose from "mongoose";
// const { Schema } = Mongoose;
import { Schema, model } from "mongoose";
import { User } from "../../types/placemark-types";

const userSchema = new Schema<User>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userType: String,
});

export const UserMongoose = model("User", userSchema);