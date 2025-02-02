import { getImageUrl } from "../utils/helpers.js";

export class Book {
  constructor(apiData) {
    this.id = apiData.id;
    this.title = apiData.volumeInfo.title || "Unknown Title";
    this.authors = apiData.volumeInfo.authors || ["Unknown Author"];
    this.description = apiData.volumeInfo.description || "No Description";
    this.thumbnail =
      getImageUrl(apiData.volumeInfo.imageLinks?.thumbnail) ||
      "/images/books.svg";
  }
}
