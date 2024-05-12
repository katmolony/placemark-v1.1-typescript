export const seedData = {
    users: {
        _model: "User",
        maggie: {
            firstName: "Maggie",
            lastName: "Simpson",
            email: "maggie@simpson.com",
            password: "secret",
            userType: "user",
        },
        admin: {
            firstName: "Kate",
            lastName: "Molony",
            email: "admin@admin.com",
            password: "secret",
            userType: "admin",
        },
        owner: {
            firstName: "Mr. Business",
            lastName: "Owner",
            email: "owner@owner.com",
            password: "secret",
            userType: "owner",
        },
        homer: {
            firstName: "Homer",
            lastName: "Simpson",
            email: "homer@simpson.com",
            password: "secret",
            userType: "user",
        },
        //   export const maggieCredentials = {
        //     email: "maggie@simpson.com",
        //     password: "secret",
        //   };
        //   export const adminCredentials = {
        //     email: "admin@admin.com",
        //     password: "secret",
        //   };
        //   export const ownerCredentials = {
        //     email: "owner@owner.com",
        //     password: "secret",
        //   };
    },
    locations: {
        _model: "Location",
        greece: {
            title: "Greece",
            imageURL: "https://cdn.britannica.com/82/195482-050-2373E635/Amalfi-Italy.jpg",
            lat: 100,
            lng: 200,
            weather: "Sunny",
            temp: 30.5,
        },
        italy: {
            title: "Italy",
            imageURL: "https://cdn.britannica.com/82/195482-050-2373E635/Amalfi-Italy.jpg",
            lat: 100,
            lng: 200,
            weather: "Sunny",
            temp: 21.5,
        },
        spain: {
            title: "Spain",
            imageURL: "https://lh5.googleusercontent.com/p/AF1QipPwWQvGO_HOnmjoMvNAeLcyrAK5uPjTlNFvxTws=w540-h312-n-k-no",
            lat: 100,
            lng: 200,
            weather: "Sunny",
            temp: 25.5,
        },
    },
    businesses: {
        _model: "Business",
        mcdonalds: {
            title: "Mc Donalds Middle Street",
            address: "123 Ronald Street, New Orleans",
            category: "Dining",
            description: "Lovely food, fun for families",
            lat: 100,
            lng: 200,
        },
        starbucks: {
            title: "Starbucks Middle Street",
            address: "123 Coffee Street, New Orleans",
            category: "Dining",
            description: "Lovely coffee",
            lat: 200,
            lng: 134,
        },
        marriot: {
            title: "Marriot",
            address: "123 Ronald Street, New Orleans",
            category: "Accommodation",
            description: "Dazzling rooms and indoor pool",
            lat: 100,
            lng: 200,
        },
    },
    //   export const serviceUrl = "http://localhost:3000";
    reviews: {
        _model: "Review",
        fiveStar: {
            content: "Nice food",
            rating: 5,
            timestamp: "2024-03-28 17:45:29",
        },
        fourStar: {
            content: "Nice place",
            rating: 4,
            timestamp: "2024-03-28 20:12:34",
        },
        threeStar: {
            content: "Nice music",
            rating: 3,
            timestamp: "2024-03-28 12:20:10",
        },
    },
};
