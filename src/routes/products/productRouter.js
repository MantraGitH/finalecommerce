import { Router } from "express";
import ProductController from "../../controllers/products/productControllers.js";
import { verifyUser } from "../../middlewares/verifyUser.js";

const controller = new ProductController();
const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", verifyUser, controller.create);
router.put("/:id", verifyUser, controller.update);
router.delete("/:id", verifyUser, controller.delete);

export default router;
