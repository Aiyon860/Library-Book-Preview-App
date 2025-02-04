import { baseTitle, baseUrl } from "../app.js";
import { categories } from "../database/categoryDatabase.js";
import { getFeaturedBooks } from "../controllers/bookController.js";
import { capitalizeWord, fetchSvg } from "../utils/helpers.js";

const mainEntryPoint = async (req, res) => {
  const books = await getFeaturedBooks(req, res, baseTitle, baseUrl);

  if (!books) {
    throw new Error("Cannot fetch data from Google Books API.");
  }

  const firstEightCategories = await Promise.all(
    categories
      .slice(0, 8)
      .map(async (category) => [
        capitalizeWord(category.name),
        await fetchSvg(category.svgFile),
      ])
  );

  const data = {
    tabTitle: `Home - ${baseTitle}`,
    webTitle: baseTitle,
    contentPath: `${baseUrl}/home`,
    statusCode: 200,
    books,
    categoryList: firstEightCategories,
  };

  res.status(200).render(`layout.ejs`, data);
};

export default mainEntryPoint;
