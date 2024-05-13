import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, BusinessSpec, BusinessSpecPlus, BusinessArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
export const businessApi = {
    findAll: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                const businesses = await db.businessStore.getAllBusinesss();
                return h.response(businesses).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: BusinessArraySpec, failAction: validationError },
        description: "Get all businesses",
        notes: "Returns all businesses"
    },
    // might be replaced by findByLocation
    findOne: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                const business = await db.businessStore.getBusinessById(request.params.id);
                if (business === null) {
                    return Boom.notFound("No business with this id");
                }
                return h.response(business).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("No business with this id");
            }
        },
        tags: ["api"],
        description: "Find a Business",
        notes: "Returns a business",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: BusinessSpecPlus, failAction: validationError }
    },
    findByLocation: {
        auth: {
            strategy: "jwt"
        },
        async handler(request, h) {
            try {
                const business = await (db.businessStore.getBusinesssByLocationId(request.params.id));
                if (business === null) {
                    return Boom.notFound("No business with this id");
                }
                return h.response(business).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("No business with this id");
            }
        },
        tags: ["api"],
        description: "Find a Business",
        notes: "Returns a business",
        validate: { params: { id: IdSpec }, failAction: validationError },
        // Respond with array as there are many businesses
        response: { schema: BusinessArraySpec, failAction: validationError },
    },
    // might be replaced by makeBusiness
    create: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                const business = await db.businessStore.addBusiness(request.params.id, request.payload);
                if (business) {
                    return h.response(business).code(201);
                }
                return Boom.badImplementation("Error creating business");
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a business",
        notes: "Returns the newly created business",
        validate: { payload: BusinessSpec },
        response: { schema: BusinessSpecPlus, failAction: validationError }
    },
    makeBusiness: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const location = (await db.locationStore.findOne(request.params.id));
            if (location === null) {
                return Boom.notFound("No location with this id");
            }
            console.log("location found");
            const businessPayload = request.payload;
            const business = {
                title: businessPayload.title,
                category: businessPayload.category,
                description: businessPayload.description,
                // field taken from axios in controller
                // address: address,
                // lat: lat,
                // lng: lon,
                address: businessPayload.address,
                lat: businessPayload.lat,
                lng: businessPayload.lng,
                //locationid: location._id,
            };
            console.log("sending to businerss store");
            const newBusiness = (await db.businessStore.addBusiness(location._id, business));
            console.log("out of business store");
            return h.response(newBusiness).code(200);
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                console.log("delete...");
                await db.businessStore.deleteAllBusinesss();
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all businesses"
    },
    deleteOne: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                const business = await db.businessStore.getBusinessById(request.params.id);
                if (business === null) {
                    return Boom.notFound("No Business with this id");
                }
                await db.businessStore.deleteBusiness(business._id);
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("No Business with this id");
            }
        },
        tags: ["api"],
        description: "Delete a business",
        validate: { params: { id: IdSpec }, failAction: validationError }
    }
};
