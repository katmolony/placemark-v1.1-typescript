import { db } from "../models/db.js";
export const businessController = {
    index: {
        handler: async function (request, h) {
            const location = await db.locationStore.getLocationById(request.params.locationid);
            const business = await db.businessStore.getBusinessById(request.params.id);
            const reviews = await db.businessStore.getReviewsByBusinessId(request.params.id);
            const viewData = {
                title: "Business View",
                location: location,
                business: business,
                reviews: reviews,
            };
            return h.view("business-view", viewData);
        },
    },
    update: {
        // validate: {
        //   payload: BusinessSpec,
        //   options: { abortEarly: false },
        //   failAction: function (request, h, error) {
        //     return h.view("business-view", { title: "Edit business error", errors: error.details }).takeover().code(400);
        //   },
        // },
        handler: async function (request, h) {
            const locationid = await db.locationStore.getLocationById(request.params.locationid);
            const business = await db.businessStore.getBusinessById(request.params.businessid);
            // changed TS
            const businessPayload = request.payload;
            const newBusiness = {
                title: businessPayload.title,
                category: businessPayload.category,
                description: businessPayload.description,
                address: businessPayload.address,
            };
            console.log(`Updating Reading ${business._id} from Location ${locationid._id}`);
            await db.businessStore.updateBusiness(business, newBusiness);
            return h.redirect(`/location/${locationid._id}/business/${business._id}`);
        },
    },
    addReview: {
        // validate: {
        //   payload: ReviewSpec,
        //   options: { abortEarly: false },
        //   failAction: function (request, h, error) {
        //     console.log("Error adding review");
        //     return h.view("business-view", { title: "Edit business error", errors: error.details }).takeover().code(400);
        //   },
        // },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const locationid = await db.locationStore.getLocationById(request.params.locationid);
            const business = await db.businessStore.getBusinessById(request.params.businessid);
            const timestamp = new Date();
            console.log(timestamp);
            try {
                const reviewPayload = request.payload;
                const newReview = {
                    content: reviewPayload.content,
                    rating: reviewPayload.rating,
                    timestamp: timestamp.toISOString().replace("T", " ").replace("Z", "").replace(/\.\d+/, ""),
                    userid: loggedInUser._id,
                    // businessid: business,
                };
                console.log(`Review ${newReview.content}, ${newReview.userid}, ${newReview.timestamp}, ${newReview.rating}`);
                await db.reviewStore.addReview(business._id, newReview);
                return h.redirect(`/location/${locationid._id}/business/${business._id}`);
            }
            catch (err) {
                return h.redirect(`/location/${locationid._id}/business/${business._id}`);
            }
        },
    },
};
