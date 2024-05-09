import { db } from "../models/db.js";
export const aboutController = {
    index: {
        handler: async function (request, h) {
            const viewData = {
                title: "About Placemark", // maybe change
            };
            return h.view("about-view", viewData);
        },
    },
    async validate(request, session) {
        const user = await db.userStore.getUserById(session.id);
        if (!user) {
            return { isValid: false };
        }
        return { isValid: true, credentials: user };
    },
};
