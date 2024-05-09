import { db } from "../models/db.js";
export const accountsController = {
    index: {
        auth: false,
        handler: async function (request, h) {
            return h.view("main", { title: "Welcome to Placemark" });
        },
    },
    showSignup: {
        auth: false,
        handler: async function (request, h) {
            return h.view("signup-view", { title: "Sign up for Placemark" });
        },
    },
    signup: {
        auth: false,
        // validate: {
        //   // maybe add as any
        //   payload: UserSpec,
        //   options: { abortEarly: false },
        //   // fix error
        //   failAction: function(request: Request, h: ResponseToolkit, error) {
        //     return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
        //   },
        // },
        // had async before TS change
        handler: async function (request, h) {
            const user = request.payload;
            await db.userStore.addUser(user);
            return h.redirect("/");
        },
    },
    showLogin: {
        auth: false,
        handler: async function (request, h) {
            return h.view("login-view", { title: "Login to Placemark" });
        },
    },
    login: {
        auth: false,
        // validate: {
        //   // change as any
        //   payload: UserCredentialsSpec,
        //   options: { abortEarly: false },
        //   failAction: function (request, h, error) {
        //     return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
        //   },
        // },
        // had async before TS change
        handler: async function (request, h) {
            const { email, password } = request.payload;
            const user = await db.userStore.getUserByEmail(email);
            if (!user || user.password !== password) {
                console.log("This user does not exist");
                return h.redirect("/");
            }
            // for admin account
            if (user.email == process.env.ADMIN_NAME || user.password == process.env.ADMIN_PASSWORD) {
                console.log("admin sign in");
                request.cookieAuth.set({ id: user._id });
                return h.redirect("/admin");
            }
            // for owner account login
            if (user.userType == "owner") {
                console.log("busniess owner sign in");
                request.cookieAuth.set({ id: user._id });
                return h.redirect("/owner");
            }
            request.cookieAuth.set({ id: user._id });
            return h.redirect("/dashboard");
        },
    },
    logout: {
        handler: async function (request, h) {
            request.cookieAuth.clear();
            return h.redirect("/");
        },
    },
    profile: {
        // had async before TS change
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const viewData = {
                title: "Placemark Dashboard",
                user: loggedInUser,
            };
            return h.view("profile-view", viewData);
        },
    },
    async validate(request, session) {
        const user = await db.userStore.getUserById(session.id);
        if (!user) {
            return { isValid: false };
        }
        return { isValid: true, credentials: user };
    },
    // need to change
    // async getLoggedInUser(request) {
    //   const userEmail = request.cookies.playlist;
    //   // db was added TS
    //   return await db.userStore.getUserByEmail(userEmail);
    // },
};
