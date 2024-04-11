import MongoDao from "../mongoDao.js";
import { ProductModel } from "./productModel.js";

export default class ProductMongoDao extends MongoDao {
  constructor() {
    super(ProductModel);
  }

  async create(productData) {
    try {
      const newItem = await ProductModel.create(productData);
      return newItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
