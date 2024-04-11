import jwt from "jsonwebtoken";
import UserMongoDao from "../persistence/daos/mongodb/users/userDao.js";
import config from "../config/config.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";

const userDao = new UserMongoDao();
const SECRET_KEY = config.SECRET_KEY_JWT;
const httpResponse = new HttpResponse();

export const checkAuthCookie = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);

    const decode = jwt.verify(token, SECRET_KEY);
    console.log("decoded");
    console.log(decode);
    const user = await userDao.getById(decode.userId);
    if (!user)
      return httpResponse.Unauthorized(res, errorsDictionary.ERROR_FIND_ITEM);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
  }
};
