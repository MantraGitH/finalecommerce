import jwt from "jsonwebtoken";
import UserMongoDao from "../persistence/daos/mongodb/users/userDao.js";
import config from "../config/config.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";

const userDao = new UserMongoDao();
const SECRET_KEY = config.SECRET_KEY_JWT;
const httpResponse = new HttpResponse();

export const verifyToken = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader)
    return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
  try {
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, SECRET_KEY);
    console.log("decoded");
    console.log(decode);
    const user = await userDao.getById(decode.userId);
    if (!user || user.role != "admin") {
      console.log(user.role);
      return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
  }
};
