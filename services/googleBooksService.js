import dotenv from "dotenv";
import { fetchData, fetchSpecificBook } from "../utils/helpers.js";

dotenv.config();

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;
const API_URL = process.env.GOOGLE_BOOKS_API_URL;

const configs = new Map([
  [
    "featuredBooks",
    {
      params: {
        q: "a",
        orderBy: "relevance",
        projection: "full",
        printType: "books",
        startIndex: 0,
        maxResults: 3,
        apiKey: API_KEY,
      },
    },
  ],
  [
    "allBooks",
    {
      params: {
        q: "a",
        orderBy: "newest",
        projection: "full",
        printType: "books",
        apiKey: API_KEY,
      },
    },
  ]
]);

const fetchFeaturedBooks = await fetchData(API_URL, configs.get("featuredBooks"));
const fetchAllBooks = await fetchData(API_URL, configs.get("allBooks"));
const fetchSpecificBookById = await fetchSpecificBook(API_URL, "iUT_AwAAQBAJ");

export { fetchAllBooks, fetchFeaturedBooks }
