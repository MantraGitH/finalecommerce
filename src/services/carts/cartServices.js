import Services from "../classServices.js";
import persistence from "../../persistence/persistence.js";

const { cartDao, productDao } = persistence;

export default class CartService extends Services {
  constructor() {
    super(cartDao);
  }

  async createCart(cartData, ownerEmail) {
    try {
      cartData.owner = ownerEmail;
      const newItem = await cartDao.createCart(cartData);
      return newItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllCarts(email) {
    try {
      const items = await cartDao.getAllCarts(email);
      if (!items) {
        return false;
      } else {
        return items;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id, email) {
    try {
      const cart = await cartDao.getById(id);
      if (!cart) {
        return false;
      } else {
        if (cart.owner !== email) {
          return false;
        }
        const cartDel = await cartDao.delete(id);
        return cartDel;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCartById(idCart, email) {
    try {
      const cart = await cartDao.getById(idCart);
      if (!cart) {
        return false;
      } else {
        if (cart.owner !== email) {
          return false;
        } else {
          return cart;
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProdToCart(cartId, prodId, email) {
    try {
      const existCart = await cartDao.getById(cartId);
      if (!existCart) {
        return false;
      }
      if (existCart.owner !== email) {
        return false;
      } else {
        const existProd = await productDao.getById(prodId);
        if (!existProd) {
          return false;
        }
        const existProdInCart = existCart.products.find((p) => {
          return p.product._id.toString() === prodId.toString();
        });
        if (existProdInCart) {
          existProdInCart.quantity++;
          existCart.save();
          const updatedCart = await cartDao.getById(cartId);
          return updatedCart;
        } else {
          const updatedCart = await cartDao.addProdToCart(existCart, prodId);
          return updatedCart;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async removeProdToCart(cartId, prodId, email) {
    try {
      const existCart = await cartDao.getById(cartId);
      if (existCart.owner !== email) {
        return false;
      } else {
        if (!existCart) {
          return false;
        }
        const existProd = await productDao.getById(prodId);
        if (!existProd) {
          return false;
        }
        const existProdInCart = existCart.products.find(
          (p) => p.product._id.toString() === prodId.toString()
        );

        if (existProdInCart && existProdInCart.quantity > 0) {
          existProdInCart.quantity--;
          await existCart.save();
          return existProdInCart;
        } else {
          return await cartDao.removeProdToCart(existCart, prodId);
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al remover el producto del carrito");
    }
  }

  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      const existCart = await getById(cartId);
      console.log("Carrito existente:", existCart);
      if (!existCart) return false;

      const existProd = existCart.products.find(
        (p) => p.product._id.toString() === prodId.toString()
      );
      console.log("Producto existente:", existProd);
      if (!existProd) return false;

      return await cartDao.updateProdQuantityToCart(
        existCart,
        existProd,
        quantity
      );
    } catch (error) {
      console.log(error);
    }
  }

  async clearCart(cartId, email) {
    try {
      const existCart = await cartDao.getById(cartId);
      if (existCart.owner !== email) {
        return false;
      } else {
        if (!existCart) {
          return false;
        } else {
          return await cartDao.clearCart(existCart);
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al limpiar el carrito");
    }
  }
}
