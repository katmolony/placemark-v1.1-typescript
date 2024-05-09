// import Mongoose from "mongoose";
// const { Schema } = Mongoose;

import { Schema, model } from "mongoose";
import { Review } from "../../types/placemark-types";

const reviewSchema = new Schema<Review>(
  {
    content: String,
    rating: Number,
    timestamp: String,
    businessid: {
      type: Schema.Types.ObjectId,
      ref: "Business",
     // required: true
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
      //  required: true 
      },
  },
  { timestamps: true } // timestamps option adds createdAt and updatedAt fields
);

export const ReviewMongoose = model("Review", reviewSchema);