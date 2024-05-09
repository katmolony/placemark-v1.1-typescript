import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const aboutController = {
    index: {
      handler: async function (request: Request, h: ResponseToolkit) {
        const viewData = {
          title: "About Placemark", // maybe change
        };
        return h.view("about-view", viewData);
      },
    },

    async validate(request: Request, session: any)  {
      const user = await db.userStore.getUserById(session.id);
      if (!user) {
        return { isValid: false };
      }
      return { isValid: true, credentials: user };
    },
  };