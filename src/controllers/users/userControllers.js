import Controllers from "../classControllers.js";
import UserService from "../../services/users/userServices.js";
import { HttpResponse, errorsDictionary } from "../../utils/http.response.js";

const httpResponse = new HttpResponse();
const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  register = async (req, res, next) => {
    try {
      const newUser = await userService.register(req.body);
      if (!newUser) {
        return httpResponse.Forbidden(res, errorsDictionary.ERROR_CREATE_USER);
      } else {
        return httpResponse.Ok(res, newUser);
      }
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { token, userId } = await userService.login(req.body);
      if (!token || !userId) {
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
      } else {
        res.cookie("token", token, { httpOnly: true });
        return httpResponse.Ok(res, { token, userId });
      }
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { first_name, last_name, email, role } = req.user;
      return httpResponse.Ok(res, {
        first_name,
        last_name,
        email,
        role,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteInactiveUsers = async (req, res, next) => {
    try {
      const deletedUsers = await userService.deleteInactiveUsers();
      if (!deletedUsers) {
        return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_ITEM);
      } else {
        return httpResponse.Ok(res, deletedUsers);
      }
    } catch (error) {
      next(error);
    }
  };

  uploaderImg = async (req, res, next) => {
    try {
      const user = req.user.id;
      if (!req.file || !user) {
        return httpResponse.ServerError(
          res,
          errorsDictionary.ERROR_UPLOAD_DOCUMENT
        );
      } else {
        const path = req.file.path;
        const userImg = await userService.uploaderImg(user, path);
        return httpResponse.Ok(res, userImg);
      }
    } catch (error) {
      next(error);
    }
  };
}
