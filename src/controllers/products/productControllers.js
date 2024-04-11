import Controllers from "../classControllers.js";
import ProductService from "../../services/products/productServices.js";
import { HttpResponse, errorsDictionary } from "../../utils/http.response.js";

const productService = new ProductService();
const httpResponse = new HttpResponse();

export default class ProductController extends Controllers {
  constructor() {
    super(productService);
  }
  create = async (req, res, next) => {
    try {
      const { email } = req.user;
      const newItem = await productService.create(req.body, email);

      return httpResponse.Ok(res, newItem);
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { email } = req.user;
      const { id } = req.params;
      let item = await this.service.getById(id);
      if (!item) {
        return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_ITEM);
      } else {
        if (req.user.role != "admin") {
          if (email != item.product_owner) {
            return httpResponse.Unauthorized(res, errorsDictionary.ERROR_TOKEN);
          } else {
            const deleteItem = await productService.delete(id);
            return httpResponse.Ok(res, deleteItem);
          }
        } else {
          const deleteItem = await productService.delete(id);
          return httpResponse.Ok(res, deleteItem);
        }
      }
    } catch (error) {
      return next(error);
    }
  };
}
