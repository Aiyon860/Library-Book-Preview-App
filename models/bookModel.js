import { mapCategoriesToColors, getImageUrl, formatDate, convertIDRToUSD, sanitizePTag } from "../utils/helpers.js";

export class Book {
  constructor(apiData) {
    this.id = apiData.id;
    this.title = apiData.volumeInfo.title || "Unknown Title";
    this.authors = apiData.volumeInfo.authors || ["Unknown Author"];
    this.publisher = apiData.volumeInfo.publisher || "Unknown Publisher";
    this.description = sanitizePTag(apiData.volumeInfo.description) || "No Description";
    this.thumbnail =
      getImageUrl(apiData.volumeInfo.imageLinks?.thumbnail) ||
      "/images/books.svg";
    this.categories = mapCategoriesToColors(apiData.volumeInfo.categories);
    this.language = apiData.volumeInfo.language.toUpperCase() || '-';
    this.publishedDate = formatDate(apiData.volumeInfo.publishedDate);
    this.pageCount = apiData.volumeInfo.pageCount || 0;
    this.averageRating = parseFloat(parseFloat(apiData.volumeInfo.averageRating).toFixed(1)) || (0.0).toFixed(1);
    this.ratingsCount = apiData.volumeInfo.ratingsCount || 0;
    this.saleability = apiData.saleInfo.saleability === "FOR_SALE";
    this.price = convertIDRToUSD(apiData.saleInfo.listPrice?.amount || 0);
  }
}
