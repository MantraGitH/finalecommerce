import Services from "../classServices.js";
import persistence from "../../persistence/persistence.js";
import { v4 as uuidv4 } from "uuid";

const { ticketDao, userDao, productDao, cartDao } = persistence;

export default class TicketService extends Services {
  constructor() {
    super(ticketDao);
  }

  async generateTicket(userId, cartId) {
    try {
      const user = await userDao.getById(userId);
      if (!user) {
        return false;
      }
      const cart = await cartDao.getById(cartId);
      if (!cart) {
        return false;
      }
      let amountAcc = 0;
      for (const p of cart.products) {
        const idProd = p.product._id.toString();
        const prodFromDB = await productDao.getById(idProd);
        if (p.quantity <= prodFromDB.stock) {
          const amount = p.quantity * prodFromDB.price;
          amountAcc += amount;
        }
      }
      const ticket = await ticketDao.create({
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount: amountAcc,
        purchaser: user.email,
      });
      cart.products = [];
      cart.save();
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }
}
