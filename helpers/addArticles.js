const { addCaseFile } = require("../queries/caseFiles");
// const translateText = require("../helpers/translateText")
const axios = require("axios");

const URL = process.env.BASE_URL;
const key = process.env.NEWS_API_KEY;

function getFormattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const day = currentDate.getDate();

  // Function to ensure two digits for month and day
  const formatTwoDigits = (num) => (num < 10 ? "0" + num : num);

  const formattedDate = `${year}-${formatTwoDigits(month)}-${formatTwoDigits(
    day
  )}`;
  return formattedDate;
}

const currentDate = getFormattedDate();

async function addArticles(allCountries) {
  console.log("running addArticles function");
  const addedArticles = await Promise.all(
    allCountries.map(async (country) => {
      const url = `${URL}?source-country=${country.country_code}&language=${country.language_code}&date=${currentDate}`;
      const response = await axios.get(url, {
        headers: {
          "x-api-key": key,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch news");
      }

      const data = response.data;
      const threeArticles = data.top_news[0].news.slice(0, 3);
      const countryArticles = [];

      for (let newFile of threeArticles) {
        const addedCaseFile = await addCaseFile({
          countries_id: country.id,
          article_id: newFile.id,
          article_content: newFile.text,
          article_title: newFile.title,
          publish_date: newFile.publish_date,
          photo_url: newFile.image,
        });
        countryArticles.push(addedCaseFile);
      }
      return countryArticles;
    })
  );

  return addedArticles.flat();
}

module.exports = addArticles;
