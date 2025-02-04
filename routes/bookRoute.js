import * as app from "../app.js";
import {
  getAllBooks,
  getSpecifiedBookById,
} from "../controllers/bookController.js";

const showAllBooks = (req, res) =>
  getAllBooks(req, res, app.baseTitle, app.baseUrl, 0);
const showSpecifiedBookById = (req, res, next) =>
  getSpecifiedBookById(req, res, next, app.baseTitle, app.baseUrl);

export { showAllBooks, showSpecifiedBookById };
