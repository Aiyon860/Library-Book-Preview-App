import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv";
import { categories, tailwindColors } from "../database/categoryDatabase.js";

dotenv.config();

// Backend
const fetchThumbnailBook = async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).send("Image URL is required");
  }

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    // Set correct content type based on the original image type
    res.setHeader("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (error) {
    console.error("Image fetch failed:", error.message);
    res.status(500).send("Failed to load image");
  }
};

/**
 * Generates a consistent hash value for a string input.
 * @param {string} inputString
 * @returns {number} Hash value
 */
const generateHash = (inputString) => {
  return Math.abs([...inputString].reduce((hash, char) => 
    char.charCodeAt(0) + ((hash << 5) - hash), 0));
};

/**
 * Gets a consistent Tailwind color based on the category name.
 * @param {string} categoryName
 * @returns {string} Corresponding color from tailwindColors
 */
const getCategoryColor = (categoryName) => {
  return tailwindColors[generateHash(categoryName) % tailwindColors.length];
};

/**
 * Extracts individual words from a string (e.g., splitting categories)
 * @param {string} inputString
 * @returns {string[]} Array of words
 */
const extractCategoryWords = (inputString) => {
  return inputString.match(/[\w&]+(?:\s[\w&]+)*/g) || [];
};

/**
 * Maps category names to their corresponding colors.
 * @param {string[]} categoryList Array of category strings
 * @returns {Object} Object with category names as keys and colors as values
 */
const mapCategoriesToColors = (categoryList) => {
  return categoryList.reduce((categoryMap, categoryString) => {
    const extractedWords = extractCategoryWords(categoryString);
    const flattenedWords = extractedWords.flat(Infinity);
    console.log(flattenedWords);

    const validCategories = flattenedWords.filter(
      (word) => categories.find((category) => category.name === word.toUpperCase())
    );

    console.log(validCategories);

    if (validCategories.length > 0) {
      validCategories.forEach((category) => {
        categoryMap[capitalizeWord(category)] = getCategoryColor(category.toUpperCase());
      });
    } else {
      categoryMap["Others"] = "stone";
    }

    return categoryMap;
  }, {});
};

const convertIDRToUSD = (money) => {
  return (money / 16000).toFixed(2);
};

// Frontend
const getImageUrl = (imageLink) => {
  return imageLink
    ? `http://localhost:3001/proxy-image?url=${encodeURIComponent(imageLink)}`
    : "/images/books.svg"; // Fallback image
};

const capitalizeWord = (word) => {
  if (!word) {
    return;
  }
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

const sanitizePTag = (strInput) => {
  return strInput
    .replace(/<p>/g, '') 
    .replace(/<\/p>/g, '<br><br>') 
    .replace(/(<br>\s*){3,}/g, '<br><br>') 
    .trim();
};

const fetchSvg = async (svgPath) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const fullPath = join(
      __dirname,
      "../public/images/categories-logo/",
      svgPath
    );
    const svgContent = await readFile(fullPath, "utf8");

    if (!svgContent) {
      throw new Error("SVG File is Empty.");
    }

    return svgContent;
  } catch (error) {
    console.error("Error reading SVG file:", error);
    return null;
  }
};

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

export {
  fetchThumbnailBook,
  fetchSvg,
  getImageUrl,
  capitalizeWord,
  formatDate,
  generateHash,
  extractCategoryWords,
  mapCategoriesToColors,
  getCategoryColor,
  convertIDRToUSD,
  sanitizePTag,
};
