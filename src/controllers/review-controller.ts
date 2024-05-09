import { Request, ResponseToolkit } from "@hapi/hapi";

export const reviewController = {
    index: {
      handler: async function (request: Request, h: ResponseToolkit) {
        return h.view("review");
      },
    },
  };