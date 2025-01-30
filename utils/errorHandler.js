let code;

const notFoundError = (req, res, baseTitle, baseUrl) => {
  console.error(`404 Error: Route not found - ${req.method} ${req.url}`);
  code = 404;
  res.status(code).render("layout.ejs", {
    tabTitle: `404 - Page Not Found - ${baseTitle}`,
    webTitle: baseTitle,
    contentPath: `${baseUrl}/error`,
    statusCode: code,
  });
};

const internalServerError = (req, res, baseTitle, baseUrl, error) => {
  console.error("An error occurred while rendering the page:", error.message);
  code = 500;
  res.status(code).render("layout.ejs", {
    tabTitle: `500 - Internal Server Error - ${baseTitle}`,
    webTitle: baseTitle,
    contentPath: `${baseUrl}/error`,
    statusCode: code,
  });
};

export { notFoundError, internalServerError };
