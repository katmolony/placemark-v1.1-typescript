export const seedData = {
  users: {
    _model: "User",
    maggie: {
      firstName: "Maggie",
      lastName: "Simpson",
      email: "maggie@simpson.com",
      password: "$2b$10$TrJEtXRofzp//AsCwDAqGu0nIRNig8s75MDLS/we1FqvywQ2QRkq2",
      userType: "user",
    },
    admin: {
      firstName: "Kate",
      lastName: "Molony",
      email: "admin@admin.com",
      password: "$2b$10$TrJEtXRofzp//AsCwDAqGu0nIRNig8s75MDLS/we1FqvywQ2QRkq2",
      userType: "admin",
    },
    owner: {
      firstName: "Mr. Business",
      lastName: "Owner",
      email: "owner@owner.com",
      password: "$2b$10$TrJEtXRofzp//AsCwDAqGu0nIRNig8s75MDLS/we1FqvywQ2QRkq2",
      userType: "owner",
    },
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2b$10$TrJEtXRofzp//AsCwDAqGu0nIRNig8s75MDLS/we1FqvywQ2QRkq2",
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
      lat: 39.0742,
      lng: 21.8243,
      weather: "Sunny",
      temp: 30.5,
    },
    italy: {
      title: "Italy",
      imageURL: "https://cdn.britannica.com/82/195482-050-2373E635/Amalfi-Italy.jpg",
      lat: 41.9028,
      lng: 12.4964,
      weather: "Sunny",
      temp: 21.5,
    },
    spain: {
      title: "Spain",
      imageURL: "https://lh5.googleusercontent.com/p/AF1QipPwWQvGO_HOnmjoMvNAeLcyrAK5uPjTlNFvxTws=w540-h312-n-k-no",
      lat: 40.4637,
      lng: -3.7492,
      weather: "Sunny",
      temp: 25.5,
    },
    ireland: {
      title: "Ireland",
      imageURL: "https://example.com/ireland-image.jpg",
      lat: 53.1424,
      lng: -7.6921,
      weather: "Cloudy",
      temp: 15.0,
    },
    france: {
      title: "France",
      imageURL: "https://example.com/france-image.jpg",
      lat: 46.6034,
      lng: 1.8883,
      weather: "Sunny",
      temp: 28.0,
    },
    germany: {
      title: "Germany",
      imageURL: "https://example.com/germany-image.jpg",
      lat: 51.1657,
      lng: 10.4515,
      weather: "Partly Cloudy",
      temp: 22.5,
    },
    uk: {
      title: "United Kingdom",
      imageURL: "https://example.com/uk-image.jpg",
      lat: 55.3781,
      lng: -3.436,
      weather: "Cloudy",
      temp: 18.0,
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
  images: {
    _model: "Image",
    greece1: {
      title: "greece_1",
      url: "placemark/locations/greece_1",
    },
    greece2: {
      title: "greece_2",
      url: "placemark/locations/greece_2",
    },
    spain1: {
      title: "spain_1",
      url: "placemark/locations/spain_1",
    },
    spain2: {
      title: "spain_2",
      url: "placemark/locations/spain_2",
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
