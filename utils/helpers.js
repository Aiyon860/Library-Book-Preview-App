import { internalServerError } from "./errorHandler.js";
import axios from "axios";

/* ================== FETCH DATA ================== */
const fetchData = async (apiUrl, config) => {
  try {
    const data = await axios
      .get(apiUrl, config)
      .then((response) => response.data);
    return data;
  } catch (error) {
    console.error(
      `Failed to fetch data from Google Books API: ${error.message}`
    );
  }
};

// TODO: FIX THE FUNCTION
const fetchSpecificBook = async (apiUrl, bookId) => {
  try {
    const data = await axios
      .get(`${apiUrl}/${bookId}`)
      .then((response) => response.data);
    return data;
  } catch (error) {
    console.error(
      `Failed to fetch data from Google Books API: ${error.message}`
    );
  }
};
/* ================================================ */

export { fetchData, fetchSpecificBook };
