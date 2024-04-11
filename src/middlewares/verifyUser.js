import jwt from "jsonwebtoken";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";
import UserMongoDao from "../persistence/daos/mongodb/users/userDao.js";
import config from "../config/config.js";

const userDao = new UserMongoDao();
const SECRET_KEY = config.SECRET_KEY_JWT;
const httpResponse = new HttpResponse();

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decode = jwt.verify(token, SECRET_KEY);
    console.log("decoded");
    console.log(decode);
    const user = await userDao.getById(decode.userId);

    if ((user && user.role === "admin") || user.role === "premium") {
      req.user = user;
      next();
    } else {
      return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
    }
  } catch (error) {
    return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
  }
};
