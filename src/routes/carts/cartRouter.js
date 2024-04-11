import { Router } from "express";
import CartController from "../../controllers/carts/cartControllers.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { checkAuthCookie } from "../../middlewares/authJwtCookies.js";

const router = Router();
const controller = new CartController();

router.get("/", checkAuthCookie, controller.getAllCarts);
router.get("/:id", checkAuthCookie, controller.getCartById);
router.post("/", checkAuthCookie, controller.createCart);
router.delete("/:id", checkAuthCookie, controller.remove);
router.post(
  "/:idCart/products/:idProd",
  checkAuthCookie,
  controller.addProdToCart
);
router.delete(
  "/:idCart/products/:idProd",
  checkAuthCookie,
  controller.removeProdToCart
);
router.delete("/clear/:idCart", checkAuthCookie, controller.clearCart);

export default router;
