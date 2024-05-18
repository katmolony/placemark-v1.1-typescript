import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ImageSpec, ImageSpecPlus, ImageArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { Location, Image } from "../types/placemark-types.js";
import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";

export const imageApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const images = await db.imageStore.getAllImages();
        return h.response(images).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ImageArraySpec, failAction: validationError },
    description: "Get all images",
    notes: "Returns all images",
  },

  // might be replaced by findByLocation
  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const image = await db.imageStore.getImagesById(request.params.id);
        if (image === null) {
          return Boom.notFound("No image with this id");
        }
        return h.response(image).code(200);
      } catch (err) {
        return Boom.serverUnavailable("No image with this id");
      }
    },
    tags: ["api"],
    description: "Find an Image",
    notes: "Returns an image",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ImageSpecPlus, failAction: validationError },
  },

  findByLocation: {
    auth: {
      strategy: "jwt",
    },
    async handler(request: Request, h: ResponseToolkit) {
      try {
        const image = (await db.imageStore.getImagesByLocationId(request.params.id)) as Image;
        if (image === null) {
          return Boom.notFound("No image with this id");
        }
        return h.response(image).code(200);
      } catch (err) {
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
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const image = await db.imageStore.addImage(request.params.id, request.payload);
        console.log("sent to store");
        if (image) {
          return h.response(image).code(201);
        }
        return Boom.badImplementation("Error creating image");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create an image",
    notes: "Returns the newly created image",
    validate: { payload: ImageSpec },
    response: { schema: ImageSpecPlus, failAction: validationError },
  },

  makeImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      const location = (await db.locationStore.findOne(request.params.id)) as Location;
      if (location === null) {
        return Boom.notFound("No location with this id");
      }
      const imagePayload = request.payload as Image;
      const image = {
        title: imagePayload.title,
        url: imagePayload.url,
        // locationid: location._id,
      };
      console.log(image);
      const newImage = (await db.imageStore.addImage(location._id, image)) as Image;
      return h.response(newImage).code(200);
    },
  },

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    payload: {
      output: "stream",
      parse: true,
      multipart: true,
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        console.log("Received request to upload image");

        const location = await db.locationStore.findOne(request.params.id);
        if (!location) {
          console.error("No location with this id");
          return Boom.notFound("No location with this id");
        }
        console.log("Found location:", location);

        const file = request.payload as File;
        if (!file) {
          console.error("File is required");
          return Boom.badRequest("File is required");
        }
        const uniqueId = uuidv4();
        const imageUrl = `placemark/${location.title}-${uniqueId}`;
        console.log("Generated unique image URL:", imageUrl);

        // Upload image to Cloudinary
        const result = cloudinary.uploader.upload_stream(
          {
            folder: "placemark",
            public_id: imageUrl,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload failed:", error);
              return h.response(Boom.serverUnavailable("Cloudinary upload failed"));
            } else {
              console.log("Cloudinary upload succeeded:", result);
              return h.response(result).code(201);
            }
          }
        );

        console.log("Starting file upload to Cloudinary");
        file.pipe(result);

        // console.log("Starting file upload to Cloudinary");
        // // Pass the file data to the Cloudinary uploader
        // file.on("data", (chunk) => {
        //   result.write(chunk);
        // });
  
        // file.on("end", () => {
        //   result.end();
        // });

      } catch (err) {
        console.error("An error occurred while uploading image to Cloudinary:", err);
        return Boom.serverUnavailable("Server error");
      }
    },
    tags: ["api"],
    description: "Upload an image",
    notes: "Uploading new image to Cloudinary",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  // uploadImage: {
  //   auth: {
  //     strategy: "jwt",
  //   },
  //   payload: {
  //     output: "stream",
  //     parse: true,
  //     multipart: true,
  //   },
  //   handler: async function (request: Request, h: ResponseToolkit) {
  //     try {
  //       const location = (await db.locationStore.findOne(request.params.id)) as Location;
  //       if (location === null) {
  //         return Boom.notFound("No location with this id");
  //       }
  //       const file = request.payload as File;
  //       if (!file) {
  //         return Boom.badRequest("File is required");
  //       }

  //   const uniqueId = uuidv4();
  //   const imageUrl = `placemark/${location.title}-${uniqueId}`;

  //       // Upload image to Cloudinary
  //       const result = cloudinary.uploader.upload_stream(
  //         {
  //           folder: "placemark",
  //           public_id: imageUrl,
  //         },
  //         async (error, result) => {
  //           if (error) {
  //             console.error(error);
  //             return Boom.serverUnavailable("Cloudinary upload failed");
  //           } else {
  //             return h.response(result).code(201);
  //           }
  //         }
  //       );
  //   //  file.pipe(result);
  //     } catch (err) {
  //       console.error("An error occurred while adding image:", err);
  //       return Boom.serverUnavailable("Server error");
  //     }
  //   },
  //   tags: ["api"],
  //   description: "Upload an image",
  //   notes: "Uploading new image to cloudinary",
  //   validate: { params: { id: IdSpec }, failAction: validationError },
  // },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        console.log("delete...");
        await db.imageStore.deleteAllImages();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all images",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const image = await db.imageStore.getImageById(request.params.id);
        if (image === null) {
          return Boom.notFound("No Image with this id");
        }
        await db.imageStore.deleteImage(image._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Image with this id");
      }
    },
    tags: ["api"],
    description: "Delete an Image",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
