const express = require("express");
const case_files = express.Router();
const { getAllCountries } = require("../queries/countries");
const { addCaseFile, getCaseFilesByCountry } = require("../queries/caseFiles");
// const URL = import.meta.env.VITE_BASE_URL;
const key = "1e784eb77662436699aa4f9da4586ef1";

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

//INDEX CASE FILES http://localhost:3003/api/countries/1/case_files
case_files.get("/:countries_id/case_files", async (req, res) => {
  const { countries_id } = req.params;
  const allCaseFilesByCountry = await getCaseFilesByCountry(countries_id);

  if (allCaseFilesByCountry[0]) {
    res.status(200).json(allCaseFilesByCountry);
  } else {
    res.status(500).json({ error: "Error fetching case files" });
  }
});

// http://localhost:3003/api/case-files/news-from-australia
case_files.get("/news-from-australia", async (req, res) => {
  try {
    const url = `https://api.worldnewsapi.com/top-news?source-country=au&language=en&date=${currentDate}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": key,
      },
    });

    if (!response.ok) {
      console.error(response.status);
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();
    const threeArticles = data.top_news[0].news.slice(0, 3);
    res.json(threeArticles);
    // console.log("*******", threeArticles);
    // case_files.post();
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// http://localhost:3003/api/case_files
// case_files.post("/", async (req, res) => {
//   const allCountries = await getAllCountries();
//   if (!allCountries[0]) {
//     res.status(500).json({ error: "Error fetching countries" });
//   }
//   const allNewCaseFiles = [];
//   for (let country of allCountries) {
//     const { id, code, name } = country;
//     // fetch
//     // `${URL}?source-country=${code}&date=2024-05-29`
//     const response = await fetch(
//       `${URL}?source-country=${code}&date=${currentDate}`,
//       {
//         method: "GET",
//         headers: {
//           "x-api-key": key,
//         },
//       }
//     );
//     console.log("response", response);
//     if (!response[0]) {
//       res
//         .status(500)
//         .json({ error: "Error fetching articles by country code" });
//     }
//     const articlesWithCountryId = response.top_news[0].news
//       .slice(0, 3)
//       .map((article) => ({
//         ...article,
//         countries_id: id,
//       }));
//     console.log("articles with id", articlesWithCountryId);
//     const newCaseFiles = await articlesWithCountryId.json();
//     if (newCaseFiles[0]) {
//       allNewCaseFiles.concat(newCaseFiles);
//       console.log("All new case files", allNewCaseFiles);
//     } else {
//       res
//         .status(500)
//         .json({ error: "No articles found for country code and date" });
//     }
//   }

//   for (let newFile of allNewCaseFiles) {
//     const addedCaseFile = await addCaseFile({
//       countries_id: newFile.countries_id,
//       article_content: newFile.text,
//       article_title: newFile.title,
//       publish_date: newFile.publish_date,
//     });
//     if (!addedCaseFile.id) {
//       res.status(500).json({ error: "Error fetching user stats" });
//     }
//   }
// });

module.exports = case_files;
