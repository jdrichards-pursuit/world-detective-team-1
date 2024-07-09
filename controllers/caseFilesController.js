const express = require("express");
require("dotenv").config();

const case_files = express.Router();
const { getAllCountries } = require("../queries/countries");
const {
  addCaseFile,
  getCaseFilesByCountry,
  getLatestCaseFile,
  deleteOldArticles,
  getAllNewCaseFiles,
} = require("../queries/caseFiles");
const checkDate = require("../helpers/checkDate");
const URL = process.env.BASE_URL;
const key = process.env.API_KEY;

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

// http://localhost:3003/api/case-files/news-from-australia
case_files.get("/news-from-australia", async (req, res) => {
  try {
    const latestFile = await getLatestCaseFile();
    console.log("Latest file", latestFile);
    const daysSinceLastArticlePost = checkDate(latestFile.publish_date);
    console.log("Days since last post", daysSinceLastArticlePost);
    if (daysSinceLastArticlePost > 1) {
      const deletedArticles = await deleteOldArticles();
      console.log("Deleted Articles", deletedArticles);
    }
    const caseFiles = await getLatestCaseFile();
    if (!caseFiles[0]) {
      const allCountries = await getAllCountries();
      if (!allCountries[0]) {
        res.status(500).json({ error: "Error fetching countries" });
      }
      const addArticles = allCountries.map(async (country) => {
        const url = `${URL}?source-country=${country.country_code}&language=en&date=${currentDate}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-api-key": key,
          },
        });
        console.log("Response", response);
        if (!response.ok) {
          //   console.error(response.status);
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        console.log("Data", data);
        const threeArticles = data.top_news[0].news.slice(0, 3);
        console.log("Articles", threeArticles);
        // res.json(threeArticles);
        // case_files.post("/news-from-australia", async (req, res) => {
        //   try {
        for (let newFile of threeArticles) {
          //   console.log("New file", newFile);
          const addedCaseFile = await addCaseFile({
            countries_id: country.id,
            article_id: newFile.id,
            article_content: newFile.text,
            article_title: newFile.title,
            publish_date: newFile.publish_date,
            photo_url: newFile.image,
          });
          console.log("Added file", addedCaseFile);
        }
        // res.status(200).json(threeArticles);
      });
      //   const allNewCaseFiles = await getAllNewCaseFiles();
      //   console.log("All new case files", allNewCaseFiles);
      //   res.status(200).json(allNewCaseFiles);
    }
    //   }
    //   catch (error) {
    //     res.status(500).json({ error: "Could not POST case files." });
    //   }
    res.status(200).json({ message: "Success adding articles!" });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//INDEX CASE FILES http://localhost:3003/api/case_files/1
case_files.get("/:countries_id", async (req, res) => {
  const { countries_id } = req.params;
  const allCaseFilesByCountry = await getCaseFilesByCountry(countries_id);
  console.log("Case files by country", allCaseFilesByCountry);

  if (allCaseFilesByCountry[0]) {
    res.status(200).json(allCaseFilesByCountry);
  } else {
    res.status(500).json({ error: "Error fetching case files" });
  }
});

module.exports = case_files;
