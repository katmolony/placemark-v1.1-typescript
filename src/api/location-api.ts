import Boom from "@hapi/boom";
import { IdSpec, LocationArraySpec, LocationSpec, LocationSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { Request, ResponseToolkit } from "@hapi/hapi";

export const locationApi = {
  findAll: { //changed from find
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const locations = await db.locationStore.getAllLocations();
        return h.response(locations).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: LocationArraySpec, failAction: validationError },
    description: "Get all locations",
    notes: "Returns all locations",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit)  {
      try {
        // const location = await db.locationStore.getLocationById(request.params.id);
        const location = await db.locationStore.findOne(request.params.id);
        if (location === null) {
          return Boom.notFound("No Location with this id");
        }
        return h.response(location).code(200);
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
    tags: ["api"],
    description: "Find a Location",
    notes: "Returns a location",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: LocationSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        // could be issue
        const location = request.payload;
        const newLocation = await db.locationStore.addLocation(location);
        if (newLocation !== null) {
          return h.response(newLocation).code(201);
        }
        return Boom.badImplementation("error creating location");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Location",
    notes: "Returns the newly created location",
    validate: { payload: LocationSpec, failAction: validationError },
    response: { schema: LocationSpecPlus, failAction: validationError },
  },

  deleteOne: { // different from lectures
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (location === null) {
          return Boom.notFound("No Location with this id");
        }
        await db.locationStore.deleteLocationById(location._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
    tags: ["api"],
    description: "Delete a location",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: { // different from lectures
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit)  {
      try {
        await db.locationStore.deleteAllLocations();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all LocationApi",
  },
};
