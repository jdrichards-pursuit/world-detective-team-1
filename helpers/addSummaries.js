const { getSummaries } = require("../helpers/aiGetSummary");

const addSummaries = (addedArticles) => {
  console.log("Added articles", addedArticles);
  const summarizedArticles = addedArticles.map(async (article) => {
    const result = await getSummaries(
      article.article_content,
      article.article_id
    );

    console.log("Result", result);
    return result;
  });
  console.log("Summaried articles", summarizedArticles);
  return summarizedArticles;
};

module.exports = { addSummaries };
