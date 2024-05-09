// import { Business } from "./business.js";
import { reviewMongoStore } from "./review-mongo-store.js";
import { BusinessMongoose } from "./business.js";
export const businessMongoStore = {
    async getAllBusinesss() {
        const businesss = await BusinessMongoose.find().lean();
        return businesss;
    },
    async addBusiness(locationId, business) {
        business.locationid = locationId;
        const newBusiness = new BusinessMongoose({ ...business });
        const businessObj = await newBusiness.save();
        return this.getBusinessById(businessObj._id);
    },
    // should id be an object of location
    async getBusinesssByLocationId(id) {
        const businesss = await BusinessMongoose.find({ locationid: id }).lean();
        return businesss;
    },
    async getBusinessById(id) {
        if (id) {
            const business = await BusinessMongoose.findOne({ _id: id }).lean();
            if (business) {
                business.reviews = await reviewMongoStore.getReviewsByBuisnessId(business._id);
            }
            return business;
        }
        return null;
    },
    async getReviewsByBusinessId(id) {
        if (id) {
            const business = await BusinessMongoose.findOne({ _id: id }).lean();
            if (business) {
                business.reviews = await reviewMongoStore.getReviewsByBuisnessId(business._id);
            }
            return business;
        }
        return null;
    },
    async deleteBusiness(id) {
        try {
            await BusinessMongoose.deleteOne({ _id: id });
        }
        catch (error) {
            console.log("bad id");
        }
    },
    async deleteAllBusinesss() {
        await BusinessMongoose.deleteMany({});
    },
    async updateBusiness(business, updatedBusiness) {
        const businessDoc = await BusinessMongoose.findOne({ _id: business._id });
        businessDoc.title = updatedBusiness.title;
        businessDoc.category = updatedBusiness.category;
        // businessDoc.address = updatedBusiness.address;
        businessDoc.description = updatedBusiness.description;
        await businessDoc.save();
    },
};
