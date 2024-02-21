import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PantryApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PantryApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
  static async getItems(id, username) {
    let res = await this.request(`items/`);

    return res.items;
  }

  static async getItemName(itemname) {
    let res = await this.request(`items/${itemname}`);

    return res.item;
  }

  static async saveItem(data) {
    console.log(" API Line# 69 data", data);
    let res = await this.request(`items/create`, data, "post");
    return res.items;
  }
  static async editItem(data) {
    console.log(" API Line# 87 data", data);
    let res = await this.request(`items/${data.id}`, data, "patch");
    return res.items;
  }
  static async deleteItem(id) {
    let res = await this.request(`items/${id}`, {}, "delete");
    return res.items;
  }
}

export default PantryApi;
