import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { showAllBooks, showSpecifiedBookById } from "./routes/bookRoute.js";
import { notFoundError } from "./utils/errorHandler.js";
import mainEntryPoint from "./routes/index.js";
import { fetchThumbnailBook } from "./utils/helpers.js";
import { sendEmail } from "./routes/emailRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("node_modules"));
app.use(bodyParser.urlencoded({ extended: true }));

// Add this middleware to disable caching in development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Set-Cookie", "SameSite=None; Secure");
    next();
  });
}

const baseTitle = "Peek-A-Book";
const baseUrl = "pages";

app.get("/", mainEntryPoint);
app.get("/book", (req, res) => res.redirect("/books"));
app.get("/book/:id", showSpecifiedBookById);
app.get("/books", showAllBooks);
app.get("/proxy-image", fetchThumbnailBook);
app.post("/send-email", sendEmail);

// 404 error handler
app.use((req, res) => notFoundError(req, res, baseTitle, baseUrl));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { baseTitle, baseUrl };