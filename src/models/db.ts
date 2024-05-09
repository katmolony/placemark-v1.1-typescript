// import { userMemStore } from "./mem/user-mem-store.js";
// import { locationMemStore } from "./mem/location-mem-store.js";
// import { businessMemStore } from "./mem/business-mem-store.js";
// import { reviewMemStore } from "./mem/review-mem-store.js";

// import { userJsonStore } from "./json/user-json-store.js";
// import { locationJsonStore } from "./json/location-json-store.js";
// import { businessJsonStore } from "./json/business-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { businessMongoStore } from "./mongo/business-mongo-store.js";
import { reviewMongoStore } from "./mongo/review-mongo-store.js";

import { Db } from "../types/placemark-types.js";

export const db: Db = {
  userStore: null,
  locationStore: null,
  businessStore: null,
  reviewStore: null,
};

export function connectDb(dbType: string) {
  switch (dbType) {
    case "mongo":
      connectMongo(db);
      break;
    default:
  }
}

//   init(storeType) {
//     switch (storeType) {
//       case "json":
//         this.userStore = userJsonStore;
//         this.locationStore = locationJsonStore;
//         this.businessStore = businessJsonStore;
//         break;
//       case "mongo":
//         this.userStore = userMongoStore;
//         this.locationStore = locationMongoStore;
//         this.businessStore = businessMongoStore;
//         this.reviewStore = reviewMongoStore;
//         connectMongo();
//         break;
//       default:
//         this.userStore = userMemStore;
//         this.locationStore = locationMemStore;
//         this.businessStore = businessMemStore;
//         this.reviewStore = reviewMemStore;
//     }
//   },
// };
