import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import UserController from "../../controllers/users/userControllers.js";
import { checkAuthCookie } from "../../middlewares/authJwtCookies.js";
import { uploader } from "../../middlewares/uploader.js";

const controller = new UserController();
const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/profile-cookie", checkAuthCookie, controller.profile);
router.get("/all", verifyToken, controller.getAll);
router.delete("/delete", verifyToken, controller.deleteInactiveUsers);
router.post(
  "/profile-img",
  checkAuthCookie,
  uploader.single("profile"),
  controller.uploaderImg
);

export default router;
