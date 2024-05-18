import { userApi } from "./api/user-api.js";
import { locationApi } from "./api/location-api.js";
import { businessApi } from "./api/business-api.js";
import { imageApi } from "./api/image-api.js";
export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
    { method: "POST", path: "/api/locations", config: locationApi.create },
    { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
    { method: "GET", path: "/api/locations", config: locationApi.findAll }, // changed from find to findAll
    { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
    { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },
    { method: "GET", path: "/api/businesss", config: businessApi.findAll }, // changed from find to findAll
    // { method: "GET" as const, path: "/api/businesss/{id}", config: businessApi.findOne },
    //  { method: "POST" as const, path: "/api/locations/{id}/businesss", config: businessApi.create },
    { method: "DELETE", path: "/api/businesss", config: businessApi.deleteAll },
    { method: "DELETE", path: "/api/businesss/{id}", config: businessApi.deleteOne },
    // might have to change to replace create and findOne
    { method: "GET", path: "/api/locations/{id}/businesss", config: businessApi.findByLocation },
    { method: "POST", path: "/api/locations/{id}/businesss", config: businessApi.makeBusiness },
    // { method: "POST", path: "/api/businesss/{businessId}/reviews", config: reviewApi.create },
    // { method: "GET", path: "/api/businesss/{businessId}/reviews", config: reviewApi.find },
    // { method: "GET", path: "/api/businesss/{businessId}/reviews/{reviewId}", config: reviewApi.findOne },
    // { method: "DELETE", path: "/api/businesss/{businessId}/reviews/{reviewId}", config: reviewApi.deleteOne },
    { method: "GET", path: "/api/images", config: imageApi.findAll },
    { method: "DELETE", path: "/api/images", config: imageApi.deleteAll },
    { method: "DELETE", path: "/api/images/{id}", config: imageApi.deleteOne },
    { method: "GET", path: "/api/locations/{id}/images", config: imageApi.findByLocation },
    { method: "POST", path: "/api/locations/{id}/images", config: imageApi.makeImage },
    { method: "POST", path: "/api/locations/{id}/imageUpload", config: imageApi.uploadImage },
];
