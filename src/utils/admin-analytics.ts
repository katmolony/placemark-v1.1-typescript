import { db } from "../models/db.js";

export const adminAnalytics = {

    getUserCount(users: string) {
        const numUsers = users.length;
        return numUsers;
    },

    getLocationCount(location: string) {
        const numlocation = location.length;
        return numlocation;
    },

    getBusinessCount(business: string) {
        const numBusiness = business.length;
        return numBusiness;
    },

}