import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ImageSpec, ImageSpecPlus, ImageArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
export const imageApi = {
    findAll: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                const images = await db.imageStore.getAllImages();
                return h.response(images).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: ImageArraySpec, failAction: validationError },
        description: "Get all images",
        notes: "Returns all images"
    },
    // might be replaced by findByLocation
    findOne: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                const image = await db.imageStore.getImagesById(request.params.id);
                if (image === null) {
                    return Boom.notFound("No image with this id");
                }
                return h.response(image).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("No image with this id");
            }
        },
        tags: ["api"],
        description: "Find an Image",
        notes: "Returns an image",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: ImageSpecPlus, failAction: validationError }
    },
    findByLocation: {
        auth: {
            strategy: "jwt"
        },
        async handler(request, h) {
            try {
                const image = await (db.imageStore.getImagesByLocationId(request.params.id));
                if (image === null) {
                    return Boom.notFound("No image with this id");
                }
                return h.response(image).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("No image with this id");
            }
        },
        tags: ["api"],
        description: "Find an Image",
        notes: "Returns an image",
        validate: { params: { id: IdSpec }, failAction: validationError },
        // Respond with array as there are many businesses
        response: { schema: ImageArraySpec, failAction: validationError },
    },
    // might be replaced by makeBusiness
    create: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                const image = await db.imageStore.addImage(request.params.id, request.payload);
                if (image) {
                    return h.response(image).code(201);
                }
                return Boom.badImplementation("Error creating image");
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create an image",
        notes: "Returns the newly created image",
        validate: { payload: ImageSpec },
        response: { schema: ImageSpecPlus, failAction: validationError }
    },
    makeImage: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const location = (await db.imageStore.findOne(request.params.id));
            if (location === null) {
                return Boom.notFound("No location with this id");
            }
            const imagePayload = request.payload;
            const image = {
                title: imagePayload.title,
                url: imagePayload.url,
                //locationid: location._id,
            };
            const newImage = (await db.imageStore.addImage(location._id, image));
            return h.response(newImage).code(200);
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                console.log("delete...");
                await db.imageStore.deleteAllImages();
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Delete all images"
    },
    deleteOne: {
        auth: {
            strategy: "jwt"
        },
        handler: async function (request, h) {
            try {
                const image = await db.imageStore.getImageById(request.params.id);
                if (image === null) {
                    return Boom.notFound("No Image with this id");
                }
                await db.imageStore.deleteImage(image._id);
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("No Image with this id");
            }
        },
        tags: ["api"],
        description: "Delete an Image",
        validate: { params: { id: IdSpec }, failAction: validationError }
    }
};
