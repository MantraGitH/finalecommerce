import Services from "../classServices.js";
import persistence from "../../persistence/persistence.js";
import { sendMail } from "../users/mailingServices.js";

const { userDao } = persistence;

export default class UserModel extends Services {
  constructor() {
    super(userDao);
  }

  register = async (user) => {
    try {
      const response = await userDao.register(user);
      await sendMail(user, "register");
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  login = async (user) => {
    try {
      const { token, userId } = await userDao.login(user);
      if (token && userId) {
        await this.updateLastConnection(userId);
        return { token, userId };
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateLastConnection = async (userId) => {
    try {
      await userDao.updateLastConnection(userId);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  uploaderImg = async (user, path) => {
    try {
      const userId = await userDao.getById(user);
      if (!userId) {
        return false;
      } else {
        const updatedUser = await userDao.updateImg(userId, path);
        return updatedUser;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteInactiveUsers = async () => {
    try {
      const inactiveUsers = await userDao.deleteInactiveUsers();
      inactiveUsers.forEach((user) => {
        sendMail(user, "inactiveUser");
      });
      return inactiveUsers;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
