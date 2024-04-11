import Services from "../classServices.js";
import persistence from "../../persistence/persistence.js";
import { sendMail } from "../users/mailingServices.js";
import ProductsRepository from "../../persistence/dtos/repository/products/productsRepository.js";

const { productDao, userDao } = persistence;
const productRepository = new ProductsRepository();

export default class ProductService extends Services {
  constructor() {
    super(productDao);
  }

  create = async (productData, ownerEmail) => {
    try {
      productData.product_owner = ownerEmail;
      const newItem = await productDao.create(productData);
      return newItem;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  delete = async (id) => {
    try {
      let item = await this.dao.getById(id);
      const user = await userDao.getByEmail(item.product_owner);
      if (!item) {
        return false;
      } else {
        const itemDeleted = await this.dao.delete(id);
        await sendMail(user, "deleteproduct");
        return itemDeleted;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getProductById = async (id) => {
    try {
      const product = await productRepository.getProductById(id);
      if (!product) {
        return false;
      } else {
        return product;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
