const { getSummaries } = require("../helpers/aiGetSummary");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const addSummaries = async (addedArticles) => {
  try {
    console.log(
      `Added ${addedArticles.length} articles in addSummaries function`
    );

    const summarizedArticles = [];
    for (const article of addedArticles) {
      const result = await getSummaries(
        article.article_content,
        article.article_id
      );
      console.log("summarized article Result", result);
      summarizedArticles.push(result);
      await delay(250);
    }

    console.log("Summarized articles", summarizedArticles);
    return summarizedArticles;
  } catch (error) {
    console.error("Error in addSummaries:", error);
    throw error;
  }
};

module.exports = { addSummaries };
