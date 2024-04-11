export default class ProductsDto {
  constructor(product) {
    (this.Nombre = product.product_name),
      (this.Precio = product.product_price),
      (this.Stock = product.product_stock);
  }
}
