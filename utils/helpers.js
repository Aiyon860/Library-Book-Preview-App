import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv";

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

export { fetchThumbnailBook, getImageUrl, capitalizeWord, fetchSvg };
