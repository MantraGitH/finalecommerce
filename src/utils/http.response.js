const HttpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

export const errorsDictionary = {
  ERROR_CREATE_ITEM: "Error creating item",
  ERROR_UPDATE_ITEM: "Error updating item",
  ERROR_DELETE_ITEM: "Error deleting item",
  ERROR_ADD_TO_CART: "Error adding product to cart",
  ERROR_DELETE_TO_CART: "Error deleting product from cart",
  ERROR_CREATE_USER: "Error creating user",
  ERROR_LOGIN: "Error login",
  ERROR_DELETE_CART: "Error deleting cart",
  ERROR_FIND_ITEM: "Error finding item",
  ERROR_TOKEN: "Token expired",
  ERROR_PASSWORD: "Password equal",
  ERROR_UPLOAD_DOCUMENT: "No se pudo cargar el archivo",
  ERROR_GET_ALL: "No se pudo listar todos los items",
  ERROR_UPLOAD_DOCUMENT: "No se pudo cargar el documento",
};

export class HttpResponse {
  Ok(res, data) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Success",
      data: data,
    });
  }

  NotFound(res, data) {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      message: "Not Found",
      error: data,
    });
  }

  Unauthorized(res, data) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      message: "Unauthorized",
      error: data,
    });
  }

  Forbidden(res, data) {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      message: "Forbidden",
      error: data,
    });
  }

  ServerError(res, data) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: data,
    });
  }
}
