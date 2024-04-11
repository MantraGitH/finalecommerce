import Controllers from "../classControllers.js";
import TicketService from "../../services/tickets/ticketServices.js";
import { HttpResponse } from "../../utils/http.response.js";

const httpResponse = new HttpResponse();
const ticketService = new TicketService();

export default class TicketController extends Controllers {
  constructor() {
    super(ticketService);
  }

  generateTicket = async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { cartId } = req.params;
      const ticket = await ticketService.generateTicket(_id, cartId);
      if (!ticket) {
        return httpResponse.NotFound(res, "Error al generar ticket");
      } else {
        return httpResponse.Ok(res, ticket);
      }
    } catch (error) {
      next(error);
    }
  };
}
