import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const API_URL = process.env.GOOGLE_BOOKS_API_URL;
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
let code;

app.get('/', (req, res) => {
  try {
    code = 200;
    res.status(code).render(`layout.ejs`, {
      tabTitle: `Home - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/home`,
      statusCode: code,
    });
  } catch (error) {
    console.error("An error occurred while rendering the page:", error.message);
    code = 500;
    res.status(code).render("layout.ejs", {
      tabTitle: `500 - Internal Server Error - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/error`,
      statusCode: code,
    });
  }
});

app.get('/book', (req, res) => {
  res.redirect('/books');
});

app.get("/book/:id", (req, res, next) => {
  const id = req.params.id;

  // Ensure ID is a positive integer
  if (!/^\d+$/.test(id)) {
    return next(); // Pass to next route (404 handler)
  }

  try {
    code = 200;
    res.status(code).render(`layout.ejs`, {
      tabTitle: `Book 1 - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/book_detail`,
      statusCode: code,
    });
  } catch (error) {
    console.error("An error occurred while rendering the page:", error.message);
    code = 500;
    res.status(code).render("layout.ejs", {
      tabTitle: `500 - Internal Server Error - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/error`,
      statusCode: code,
    });
  }
});

app.get('/books', (req, res) => {
  try {
    code = 200;
    res.status(code).render(`layout.ejs`, {
      tabTitle: `Books - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/books_section`,
      statusCode: code,
    });
  } catch (error) {
    console.error("An error occurred while rendering the page:", error.message);
    code = 500;
    res.status(code).render("layout.ejs", {
      tabTitle: `500 - Internal Server Error - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/error`,
      statusCode: code,
    });
  }
});

app.use((req, res) => {
  console.error(`404 Error: Route not found - ${req.method} ${req.url}`);
  const code = 404;
  res.status(code).render("layout.ejs", { 
    tabTitle: `404 - Page Not Found - ${baseTitle}`,
    webTitle: baseTitle,
    contentPath: `${baseUrl}/error`,
    statusCode: code,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});