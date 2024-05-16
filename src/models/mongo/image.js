import { Schema, model } from "mongoose";
const imageSchema = new Schema({
    url: String,
    title: String,
    locationid: {
        type: Schema.Types.ObjectId,
        ref: "Location",
    },
});
export const ImageMongoose = model("Image", imageSchema);
