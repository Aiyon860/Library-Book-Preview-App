import { internalServerError } from "../utils/errorHandler.js";

const getAllBooks = (req, res, baseTitle, baseUrl) => {
  try {
    const code = 200;
    res.status(code).render(`layout.ejs`, {
      tabTitle: `Home - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/books_section`,
      statusCode: code,
    });
  } catch (error) {
    internalServerError(req, res, baseTitle, baseUrl, error);
  }
};

// TODO: MAKE IT DYNAMIC BOOMZ
const getSpecifiedBookById = (req, res, next, baseTitle, baseUrl) => {
  const id = req.params.id;

  // Ensure ID is a positive integer
  if (!/^\d+$/.test(id)) {
    return next(); // Pass to next route (404 handler)
  }

  try {
    const code = 200;
    res.status(code).render(`layout.ejs`, {
      tabTitle: `Book ${id} - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/book_detail`,
      statusCode: code,
    });
  } catch (error) {
    internalServerError(req, res, baseTitle, baseUrl, error);
  }
};

export { getAllBooks, getSpecifiedBookById };
