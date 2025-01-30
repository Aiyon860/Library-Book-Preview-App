import { baseTitle, baseUrl } from "../app.js";
import { fetchFeaturedBooks } from "../services/googleBooksService.js";
import { internalServerError } from "../utils/errorHandler.js";

const mainEntryPoint = async (req, res) => {
  try {
    const code = 200;

    res.status(code).render(`layout.ejs`, {
      tabTitle: `Home - ${baseTitle}`,
      webTitle: baseTitle,
      contentPath: `${baseUrl}/home`,
      statusCode: code,
      featuredBooks: fetchFeaturedBooks,
    });
  } catch (error) {
    internalServerError(req, res, baseTitle, baseUrl, error);
  }
};

export default mainEntryPoint;