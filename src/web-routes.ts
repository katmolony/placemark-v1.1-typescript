import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { locationController } from "./controllers/location-controller.js";
import { businessController } from "./controllers/business-controller.js";
import { reviewController } from "./controllers/review-controller.js";
import os from "os";

export const webRoutes = [
  { method: "GET" as const, path: "/", config: accountsController.index },
  { method: "GET" as const, path: "/signup", config: accountsController.showSignup },
  { method: "GET" as const, path: "/login", config: accountsController.showLogin },
  { method: "GET" as const, path: "/logout", config: accountsController.logout },
  { method: "POST" as const, path: "/register", config: accountsController.signup },
  { method: "POST" as const, path: "/authenticate", config: accountsController.login },
  { method: "GET" as const, path: "/profile", config: accountsController.profile },

  { method: "GET" as const, path: "/about", config: aboutController.index },

  { method: "GET" as const, path: "/dashboard", config: dashboardController.index },
  { method: "POST" as const, path: "/dashboard/addlocation", config: dashboardController.addLocation },

  // for admin dashboard
  { method: "GET" as const, path: "/admin", config: dashboardController.admin },
  // for owner dashboard
  { method: "GET" as const, path: "/owner", config: dashboardController.owner },
  { method: "GET" as const, path: "/dashboard/deletelocation/{id}", config: dashboardController.deleteLocation },
  { method: "GET" as const, path: "/dashboard/deleteuser/{id}", config: dashboardController.deleteUser },

  { method: "GET" as const, path: "/location/{id}", config: locationController.index },
  { method: "POST" as const, path: "/location/{id}/addbusiness", config: locationController.addBusiness },
  { method: "GET" as const, path: "/location/{id}/deletebusiness/{businessid}", config: locationController.deleteBusiness },
  // { method: "GET" as const, path: "/location/{id}/filterbusinesscategory", config: locationController.filterBusinessCategory },

  { method: "GET" as const, path: "/location/{locationid}/business/{id}", config: businessController.index },
  { method: "POST" as const, path: "/location/{locationid}/updateBusiness/{businessid}", config: businessController.update },

  { method: "GET" as const, path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false  as const } },

  // Reviews
  // { method: "GET", path: "/business/(businessid}/review/{id}", config: reviewController.index },
  { method: "POST" as const, path: "/location/{locationid}/business/{businessid}/addreview", config: businessController.addReview },

  // {
  //   method: "GET" as const,
  //   path: "/testlb",
  //   handler: function (request, h) {
  //     return "Server: " + os.hostname();
  //   },
  //   config: { auth: false as const },
  // },

];
