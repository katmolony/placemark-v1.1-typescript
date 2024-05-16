import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { UserSpec, UserSpecPlus, IdSpec, UserArray } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { createToken } from "./jwt-utils.js";
import { User } from "../types/placemark-types.js";
import bcrypt from 'bcrypt';

export const userApi = {
  find: {
    auth: {
      // added in after Hapi implementation
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const users = await db.userStore.getAllUsers();
        return h.response(users).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all userApi",
    notes: "Returns details of all userApi",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        const user = (await db.userStore.getUserById(request.params.id)) as User;
        if (user === null) {
          return Boom.notFound("No User with this id");
        }
        return h.response(user).code(200);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      try {
        console.log("HERE");
        const userPayload = request.payload as User;
        console.log(userPayload);

        const hashedPassword = await bcrypt.hash(userPayload.password, 10); 
        console.log(hashedPassword);

        const userHashed = {
          email: userPayload.email,
          password: hashedPassword,
          firstName: userPayload.firstName,
          lastName: userPayload.lastName,
          userType: userPayload.userType,
        }
        console.log(userHashed);

        const user = (await db.userStore.addUser(userHashed)) as User;
        // if (user) {
        return h.response(user).code(201);
        // }
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request: Request, h: ResponseToolkit){
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all userApi",
    notes: "All userApi removed from Playtime",
  },

  authenticate: {
    auth: false,
    handler: async function  (request: Request, h: ResponseToolkit)  {
      const payload = request.payload as User;
      try {
        const user = (await db.userStore.getUserByEmail(payload.email)) as User;
        if (user === null) return Boom.unauthorized("User not found");

        const passwordsMatch= await bcrypt.compare(payload.password, user.password); 
        if (!passwordsMatch) return Boom.unauthorized("Invalid password");
        const token = createToken(user);
        return h.response({ success: true, 
          name: `${user.firstName} ${user.lastName}`, 
          token: token, _id: user._id 
        }).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
