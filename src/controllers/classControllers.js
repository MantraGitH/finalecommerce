import { HttpResponse, errorsDictionary } from "../utils/http.response.js";

const httpResponse = new HttpResponse();

export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const items = await this.service.getAll();
      if (!items) {
        return httpResponse.ServerError(res, errorsDictionary.ERROR_GET_ALL);
      } else {
        return httpResponse.Ok(res, items);
      }
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const item = await this.service.getById(id);
      if (!item) {
        return httpResponse.NotFound(res, errorsDictionary.ERROR_FIND_ITEM);
      } else {
        return httpResponse.Ok(res, item);
      }
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const newItem = await this.service.create(req.body);
      if (!newItem) {
        return httpResponse.NotFound(res, errorsDictionary.ERROR_CREATE_ITEM);
      } else {
        return httpResponse.Ok(res, newItem);
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      let item = await this.service.getById(id);
      if (!item) {
        return httpResponse.NotFound(res, errorsDictionary.ERROR_UPDATE_ITEM);
      } else {
        const updateItem = await this.service.update(id, req.body);
        return httpResponse.Ok(res, updateItem);
      }
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      let item = await this.service.getById(id);
      if (!item) {
        return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_ITEM);
      } else {
        const itemDeleted = await this.service.delete(id);
        return httpResponse.Ok(res, itemDeleted);
      }
    } catch (error) {
      next(error);
    }
  };
}
