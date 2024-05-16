import { ImageMongoose } from "./image.js";
export const imageMongoStore = {
    async getAllImages() {
        const images = await ImageMongoose.find().lean();
        return images;
    },
    async addImage(locationId, image) {
        // business.locationid = locationId;
        const newImage = new ImageMongoose({ ...image });
        const imageObj = await newImage.save();
        return this.getImageById(imageObj._id);
    },
    async getImagesByLocationId(id) {
        const images = await ImageMongoose.find({ locationid: id }).lean();
        if (!images) {
            return null;
        }
        console.log(images);
        return images;
    },
    async getImageById(id) {
        if (id) {
            const image = await ImageMongoose.findOne({ _id: id }).lean();
            //   if (image) {
            //     image.reviews = await reviewMongoStore.getReviewsByBuisnessId(business._id);
            //   }
            return image;
        }
        return null;
    },
    async deleteImage(id) {
        try {
            await ImageMongoose.deleteOne({ _id: id });
        }
        catch (error) {
            console.log("bad id");
        }
    },
    async deleteAllImages() {
        await ImageMongoose.deleteMany({});
    },
};
