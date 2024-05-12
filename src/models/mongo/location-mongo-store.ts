// import { Location } from "./location.js";
import { businessMongoStore } from "./business-mongo-store.js";
import { Location } from "../../types/placemark-types.js";
import { LocationMongoose } from "./location.js";

export const locationMongoStore = {
  async getAllLocations(): Promise<Location[]> {
    const locations = await LocationMongoose.find().lean();
    return locations;
  },

  // async getLocationById(id: string): Promise<Location | null> {
  //   if (id) {
  //     const location = await LocationMongoose.findOne({ _id: id }).lean().populate("business");
  //     if (location) {
  //       location.businesss = await businessMongoStore.getBusinesssByLocationId(location._id);
  //     }
  //     return location;
  //   }
  //   return null;
  // },

  async findOne(id: string): Promise<Location | null> {
    const location = await LocationMongoose.findOne({ _id: id }).lean();
    return location;
  },

  async addLocation(location: Location) {
    const newLocation = new LocationMongoose(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },

  async favouriteLocation(location: Location): Promise<Location | null>{
    const favouriteLocation = new LocationMongoose(location);
    const locationObj = await favouriteLocation.save();
    return this.getLocationById(locationObj._id);
  },

  async getUserLocations(id: string): Promise<Location []> {
    const location = await LocationMongoose.find({ userid: id }).lean();
    return location;
  },

  async deleteLocationById(id: string) {
    try {
      await LocationMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await LocationMongoose.deleteMany({});
  },

  // async getLocationByCity(cityName: string): Promise<Location | null> {
  //   const location = await LocationMongoose.find({ city: cityName }).lean();
  //   if (null) {
  //     return null;
  //   } else {
  //     return location;
  //   }
  // },
};
