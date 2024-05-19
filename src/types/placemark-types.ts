export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  _id: string;
};

export type Location = {
  title: string;
  imageURL: string;
  lat: number;
  lng: number;
  temp: number;
  weather: string;
  userid: User | string;
  // could be wrong
  // businesss?: Business[];
  _id: string;
};

export type BusinessCategories = "Accommodation" | "Dining" | "Shopping" | "Nightlife" | "Activities";

export type Business = {
  title: string;
  address: string;
  description: string;
  lat: number;
  lng: number;
  category: BusinessCategories | string;
  locationid: Location | string;
  //locationid: string;
  // reviews: Review[];
  _id: string;
};

export type Image = {
  url: string;
  title: string;
  locationid: Location | string;
  _id: string;
};

import mongoose, { Schema, Document } from "mongoose";

export interface Review extends Document {
  content: string;
  rating: number;
  businessid: mongoose.Types.ObjectId | string;
  userid: mongoose.Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
  timestamp: string;
}

const reviewSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    businessid: { type: Schema.Types.ObjectId, ref: "Business", required: true },
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model<Review>("Review", reviewSchema);

export default ReviewModel;

export type Db = {
  userStore: any;
  locationStore: any;
  businessStore: any;
  reviewStore: any;
  imageStore: any;
};
