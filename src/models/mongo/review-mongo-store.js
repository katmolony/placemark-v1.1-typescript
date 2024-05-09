import { ReviewMongoose } from "./review.js";
export const reviewMongoStore = {
    async getAllReviews() {
        const reviews = await ReviewMongoose.find().lean();
        return reviews;
    },
    async addReview(businessId, review) {
        review.businessid = businessId;
        const newReview = new ReviewMongoose(review);
        const reviewObj = await newReview.save();
        return this.getReviewById(reviewObj._id);
    },
    async getReviewsByBuisnessId(id) {
        const reviews = await ReviewMongoose.find({ businessid: id }).lean();
        return reviews;
    },
    async getReviewById(id) {
        if (id) {
            const review = await ReviewMongoose.findOne({ _id: id }).lean();
            return review;
        }
        return null;
    },
    async deleteReview(id) {
        try {
            await ReviewMongoose.deleteOne({ _id: id });
        }
        catch (error) {
            console.log("bad id");
        }
    },
    async deleteAllReviews() {
        await ReviewMongoose.deleteMany({});
    },
    // async updateReview(review: Review, updatedReview: Review) {
    //   const reviewDoc = await ReviewMongoose.findOne({ _id: review._id });
    //   reviewDoc.content = updatedReview.content;
    //   reviewDoc.rating = updatedReview.rating;
    //   await reviewDoc.save();
    // },
};
