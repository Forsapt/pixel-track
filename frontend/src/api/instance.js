import axios from "axios"
import config from "../config"
import jwt from "./middleware/jwt";

let instance = axios.create({
  baseURL: config.apiUrl
})

jwt(instance)


export default instance
