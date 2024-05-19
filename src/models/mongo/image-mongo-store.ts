// import { Business } from "./business.js";
import { reviewMongoStore } from "./review-mongo-store.js";
import { Image } from "../../types/placemark-types.js";
import { ImageMongoose } from "./image.js";

export const imageMongoStore = {
  async getAllImages(): Promise<Image[]> {
    const images = await ImageMongoose.find().lean();
    return images;
  },

  async addImage(locationId: string, image: Image): Promise<Image | null> {
    image.locationid = locationId;
    const newImage = new ImageMongoose({ ...image });
    const imageObj = await newImage.save();
    return this.getImageById(imageObj._id);
  },

  async getImagesByLocationId(id: string): Promise<Image[] | null> {
    const images = await ImageMongoose.find({ locationid: id }).lean();
    if (!images) {
      return null;
    }
    console.log(images);
    return images;
  },

  async getImageById(id: string): Promise<Image | null> {
    if (id) {
      const image = await ImageMongoose.findOne({ _id: id }).lean();
    //   if (image) {
    //     image.reviews = await reviewMongoStore.getReviewsByBuisnessId(business._id);
    //   }
      return image;
    }
    return null;
  },

  async deleteImage(id: string) {
    try {
      await ImageMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllImages() {
    await ImageMongoose.deleteMany({});
  },

};