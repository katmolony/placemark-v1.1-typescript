import axios from "axios";

import { maggie, serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const response = await axios.delete(`${this.placemarkUrl}/api/users`);
    return response.data;
  },

  async createLocation(location) {
    const res = await axios.post(`${this.placemarkUrl}/api/locations`, location);
    return res.data;
  },

  async deleteAllLocations() {
    const response = await axios.delete(`${this.placemarkUrl}/api/locations`);
    return response.data;
  },

  async deleteLocation(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/locations/${id}`);
    return response;
  },

  async getAllLocations() {
    const res = await axios.get(`${this.placemarkUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/locations/${id}`);
    return res.data;
  },

  async getAllBusinesss() {
    const res = await axios.get(`${this.placemarkUrl}/api/businesss`);
    return res.data;
  },

  async createBusiness(id, business) {
    const res = await axios.post(`${this.placemarkUrl}/api/locations/${id}/businesss`, business);
    return res.data;
  },

  async deleteAllBusinesss() {
    const response = await axios.delete(`${this.placemarkUrl}/api/businesss`);
    return response.data;
  },

  async getBusiness(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/businesss/${id}`);
    return res.data;
  },

  async deleteBusiness(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/businesss/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

};