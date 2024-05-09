// import Mongoose from "mongoose";
// const { Schema } = Mongoose;

import { Schema, model } from "mongoose";
import { Location } from "../../types/placemark-types";

const locationSchema = new Schema<Location>({
  title: String,
  imageURL: String,
  lat: Number,
  lng: Number,
  temp: Number,
  weather: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const LocationMongoose = model("Location", locationSchema);
