// import Mongoose from "mongoose";
// const { Schema } = Mongoose;
import { Schema, model } from "mongoose";
import { Business } from "../../types/placemark-types";
// Define the categories separately
// const categories = ["Accommodation", "Dining", "Shopping", "Nightlife", "Activities"];


const businessSchema = new Schema<Business>({
  title: String,
  address: String,
  description: String,
  lat: Number,
  lng: Number,
  category: String,
  locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const BusinessMongoose = model("Business", businessSchema);