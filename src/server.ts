import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Hapi , { Server } from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import HapiSwagger from "hapi-swagger";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import { webRoutes } from "./web-routes.js";
import { connectDb } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { validate } from "./api/jwt-utils.js";
import { apiRoutes } from "./api-routes.js";
import {v2 as cloudinary} from 'cloudinary';
import bcrypt from 'bcrypt';

// // add to env file
cloudinary.config({ 
  VITE_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  VITE_CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY, 
  VITE_CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// // Log the configuration
// console.log("cloud config ", cloudinary.config());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function importEnvs() {
  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    process.exit(1);
  }
}

const swaggerOptions = {
  info: {
    title: "Placemark API", //was changed
    version: "0.1",
  },
};

async function init() {
  importEnvs();
  const server: Server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: { cors: true },
  });

  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(jwt);

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.validator(Joi);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.strategy("jwt", "jwt", {
    key: process.env.COOKIE_PASSWORD,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
  server.auth.default("session");

  connectDb("mongo");

  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  // process.exit(1);
});

await init();
