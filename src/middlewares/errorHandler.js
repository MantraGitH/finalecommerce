import { HttpResponse } from "../utils/http.response.js";
const htttpResponse = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    console.log(error);
    return htttpResponse.NotFound(res, error.message);
}