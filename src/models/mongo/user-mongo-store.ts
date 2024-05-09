import { User } from "../../types/placemark-types.js";
import { UserMongoose } from "./user.js";

export const userMongoStore = {
  async getAllUsers(): Promise<User[]>  {
    const users = await UserMongoose.find().lean();
    return users;
  },

  async getUserById(id: string): Promise<User | null> {
    if (id) {
      const user = await UserMongoose.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  //changed to any
  async addUser(user: any): Promise<User | null>{
    const newUser = new UserMongoose(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserMongoose.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id: string) {
    try {
      await UserMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await UserMongoose.deleteMany({});
  }
};