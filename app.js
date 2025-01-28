import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const API_URL = "";
const PORT = process.env.PORT || 3000;

const yourBearerToken = process.env.BEARER_TOKEN;
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(express.static("public"));
app.use(express.static("node_modules"));
app.use(bodyParser.urlencoded({ extended: true }));

// Add this middleware to disable caching in development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    next();
  });
}

const baseTitle = "Peek-A-Book";
const baseUrl = "pages";

app.get('/', (req, res) => {
  try {
    res.render(`layout.ejs`, {
      tabTitle: `Home - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/home`
    });
  } catch (error) {
    console.error(error.message);
    res.render(`${baseUrl}/error`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});