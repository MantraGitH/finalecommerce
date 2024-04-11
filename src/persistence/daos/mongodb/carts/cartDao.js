import MongoDao from "../mongoDao.js";
import { CartModel } from "./cartModel.js";

export default class CartsMongoDao extends MongoDao {
  constructor() {
    super(CartModel);
  }

  async createCart(cartData) {
    try {
      const newItem = await CartModel.create(cartData);
      return newItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCarts(email) {
    try {
      const response = await CartModel.find({ owner: email });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProdToCart(existCart, prodId) {
    try {
      const newProd = {
        quantity: 1,
        product: prodId,
      };
      existCart.products.push(newProd);
      await this.model.updateOne({ _id: existCart._id }, existCart);
      const response = await CartModel.find({ _id: existCart._id });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async removeProdToCart(existCart, productToRemove) {
    try {
      if (!existCart) {
        throw new Error("Carrito no encontrado");
      }
      if (!existCart.products || existCart.products.length === 0) {
        throw new Error("El carrito no tiene productos");
      }
      if (!productToRemove._id) {
        throw new Error("El producto no tiene id");
      }
      const productIndex = existCart.products.findIndex(
        (p) => p.product._id.toString() === productToRemove._id.toString()
      );
      if (productIndex === -1) {
        throw new Error("Producto no encontrado en el carrito");
      }
      existCart.products.splice(productIndex, 1);
      const updatedCart = await existCart.save();
      return updatedCart;
    } catch (error) {
      console.error(error);
      throw new Error("Error al remover un producto del carrito");
    }
  }

  async clearCart(cart) {
    try {
      if (!cart) {
        return false;
      }
      cart.products = [];
      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      console.error(error);
      throw new Error("Error al limpiar el carrito");
    }
  }
}
