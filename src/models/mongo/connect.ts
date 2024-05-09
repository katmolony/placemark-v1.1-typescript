import * as dotenv from "dotenv";
import Mongoose from "mongoose";
// @ts-ignore
import * as mongooseSeeder from "mais-mongoose-seeder";
import { userMongoStore } from "./user-mongo-store.js";
import { seedData } from "./seed-data.js"
import { locationMongoStore } from "./location-mongo-store.js";
import { businessMongoStore } from "./business-mongo-store.js";
import { reviewMongoStore } from "./review-mongo-store.js";
import { Db } from "../../types/placemark-types.js";

const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

export function connectMongo(db: Db) {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db as string);
  const mongoDb = Mongoose.connection;

  db.userStore = userMongoStore;
  db.locationStore = locationMongoStore;
  db.businessStore = businessMongoStore;
  db.reviewStore = reviewMongoStore;

  mongoDb.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  mongoDb.on("disconnected", () => {
    console.log("database disconnected");
  });

  mongoDb.once("open", function () {
   console.log(`database connected to ${this.name} on ${this.host}`);
    seed(); // added after
  });
}