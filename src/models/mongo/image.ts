import { Schema, model } from "mongoose";
import { Image } from "../../types/placemark-types";

const imageSchema = new Schema<Image>({
  url: String,
  title: String,
  locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const ImageMongoose = model("Image", imageSchema);