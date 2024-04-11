import persistence from "../../../persistence.js";
import ProductsDto from "../../responses/products/productsDto.js";

const { productDao } = persistence;

export default class ProductsRepository {
  constructor() {
    this.dao = productDao;
  }

  async getProductById(id) {
    try {
      const response = await productDao.getById(id);
      console.log("rRepository:", response);
      return new ProductsDto(response);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
