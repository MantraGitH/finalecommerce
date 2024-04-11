import { Router } from "express";
import productRouter from "./products/productRouter.js";
import userRouter from "./users/userRouter.js";
import cartRouter from "./carts/cartRouter.js";
import ticketRouter from "./tickets/ticketRouter.js";

export default class MainRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.use("/products", productRouter);
    this.router.use("/users", userRouter);
    this.router.use("/carts", cartRouter);
    this.router.use("/tickets", ticketRouter);
  }

  getRouter() {
    return this.router;
  }
}
