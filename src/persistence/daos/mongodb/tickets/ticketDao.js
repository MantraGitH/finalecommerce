import MongoDao from "../mongoDao.js";
import { TicketModel } from "../tickets/ticketModel.js";

export default class TicketMongoDao extends MongoDao {
  constructor() {
    super(TicketModel);
  }
}
