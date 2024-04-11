import ProductMongoDao from "./daos/mongodb/products/productDao.js";
import UserMongoDao from "./daos/mongodb/users/userDao.js";
import CartsMongoDao from "./daos/mongodb/carts/cartDao.js";
import TicketMongoDao from "./daos/mongodb/tickets/ticketDao.js";
import "dotenv/config";
import { initMongoDB } from "../config/connection.js";

let userDao;
let productDao;
let cartDao;
let ticketDao;
const persistence = process.argv[2];
switch (persistence) {
  case "MONGO":
    await initMongoDB();
    userDao = new UserMongoDao();
    productDao = new ProductMongoDao();
    cartDao = new CartsMongoDao();
    ticketDao = new TicketMongoDao();
    console.log(persistence);
    break;
}

export default { userDao, productDao, cartDao, ticketDao };
