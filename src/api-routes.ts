import { userApi } from "./api/user-api.js";
import { locationApi } from "./api/location-api.js";
import { businessApi } from "./api/business-api.js";

export const apiRoutes = [
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST" as const, path: "/api/locations", config: locationApi.create },
  { method: "DELETE" as const, path: "/api/locations", config: locationApi.deleteAll },
  { method: "GET" as const, path: "/api/locations", config: locationApi.find },
  { method: "GET" as const, path: "/api/locations/{id}", config: locationApi.findOne },
  { method: "DELETE" as const, path: "/api/locations/{id}", config: locationApi.deleteOne },

  { method: "GET" as const, path: "/api/businesss", config: businessApi.findAll }, // changed from find to findAll
  { method: "GET" as const, path: "/api/businesss/{id}", config: businessApi.findOne },
  { method: "POST" as const, path: "/api/locations/{id}/businesss", config: businessApi.create },
  { method: "DELETE" as const, path: "/api/businesss", config: businessApi.deleteAll },
  { method: "DELETE" as const, path: "/api/businesss/{id}", config: businessApi.deleteOne },
  // might have to change to replace create and findOne
  { method: "GET" as const, path: "/api/locations/{id}/businesss", config: businessApi.findByLocation },
  { method: "POST" as const, path: "/api/locations/{id}/businesss", config: businessApi.makeBusiness },

  // { method: "POST", path: "/api/businesss/{businessId}/reviews", config: reviewApi.create },
  // { method: "GET", path: "/api/businesss/{businessId}/reviews", config: reviewApi.find },
  // { method: "GET", path: "/api/businesss/{businessId}/reviews/{reviewId}", config: reviewApi.findOne },
  // { method: "DELETE", path: "/api/businesss/{businessId}/reviews/{reviewId}", config: reviewApi.deleteOne },

];
