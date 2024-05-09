import mongoose, { Schema } from 'mongoose';
const reviewSchema = new Schema({
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    businessid: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
const ReviewModel = mongoose.model('Review', reviewSchema);
export default ReviewModel;
