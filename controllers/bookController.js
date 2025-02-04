import dotenv from "dotenv";
import { Book } from "../models/bookModel.js";
import { fetchBooks } from "../services/googleBooksService.js";
import { internalServerError } from "../utils/errorHandler.js";

dotenv.config();

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const API_URL = process.env.GOOGLE_BOOKS_API_URL;

const getAllBooks = async (req, res, baseTitle, baseUrl, startIndex) => {
  try {
    const code = 200;

    const config = {
      params: {
        q: "a",
        orderBy: "newest",
        projection: "full",
        printType: "books",
        startIndex,
        maxResults: 8,
        apiKey: API_KEY,
      },
    };

    const allBooks = await fetchBooks(API_URL, config);
    const allModeledBooks = allBooks.items.map((item) => new Book(item));

    const data = {
      tabTitle: `Home - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/books_section`,
      statusCode: code,
      books: allModeledBooks,
    };

    res.status(200).render(`layout.ejs`, data);
  } catch (error) {
    internalServerError(req, res, baseTitle, baseUrl, error);
  }
};

const getFeaturedBooks = async (req, res, baseTitle, baseUrl) => {
  try {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: false,
      params: {
        q: "a",
        orderBy: "relevance",
        projection: "full",
        printType: "books",
        startIndex: 0,
        maxResults: 3,
        apiKey: API_KEY,
      },
    };

    const allBooks = await fetchBooks(API_URL, config);
    const allModeledBooks = allBooks.items.map((item) => new Book(item));

    return allModeledBooks;
  } catch (error) {
    internalServerError(req, res, baseTitle, baseUrl, error);
    return null;
  }
};

const getSpecifiedBookById = async (req, res, next, baseTitle, baseUrl) => {
  const id = req.params.id;

  try {
    const code = 200;

    const config = {
      params: {
        apiKey: API_KEY,
      },
    };

    // TODO: MAKE IT DYNAMIC
    const specifiedBook = await fetchBooks(`${API_URL}/${id}`, config);
    const modeledBook = new Book(specifiedBook);

    const data = {
      tabTitle: `${modeledBook.title} - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/book_detail`,
      statusCode: code,
      book: modeledBook,
    };

    res.status(code).render(`layout.ejs`, data);
  } catch (error) {
    internalServerError(req, res, baseTitle, baseUrl, error);
  }
};

export { getAllBooks, getFeaturedBooks, getSpecifiedBookById };
