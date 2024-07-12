const express = require("express");
require("dotenv").config();

const case_files = express.Router();
const { getAllCountries } = require("../queries/countries");
const {
  getCaseFilesByCountry,
  getLatestCaseFile,
  getAllNewCaseFiles,
} = require("../queries/caseFiles");
const deleteOldCaseFiles = require("../helpers/deleteOldCaseFiles");
const addArticles = require("../helpers/addArticles");
const { getSummaries } = require("../helpers/aiGetSummary");
const { addSummaries } = require("../helpers/addSummaries");

// http://localhost:3003/api/case_files/news-from-australia
case_files.get("/news-from-australia", async (_req, res) => {
  try {
    await deleteOldCaseFiles();
    const checkCaseFiles = await getAllNewCaseFiles();

    if (!checkCaseFiles[0]) {
      console.log("No new case files, going to getAll");
      const allCountries = await getAllCountries();
      if (!allCountries[0]) {
        return res.status(500).json({ error: "Error fetching countries" });
      }

      const addedArticles = await addArticles(allCountries);

      if (addedArticles.length > 0) {
        const summarizedArticles = await addSummaries(addedArticles);
        console.log("Success adding articles!", summarizedArticles);
        return res
          .status(200)
          .json({ message: "Success adding articles!", summarizedArticles });
      }
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//INDEX CASE FILES http://localhost:3003/api/case_files/1
case_files.get("/news-from-australia", async (_req, res) => {
  try {
    await deleteOldCaseFiles();
    const checkCaseFiles = await getAllNewCaseFiles();

    if (!checkCaseFiles[0]) {
      console.log("No new case files, going to getAll");
      const allCountries = await getAllCountries();
      if (!allCountries[0]) {
        console.error("Error fetching countries");
        return res.status(500).json({ error: "Error fetching countries" });
      }

      const addedArticles = await addArticles(allCountries);

      if (addedArticles.length > 0) {
        const summarizedArticles = await addSummaries(addedArticles);
        console.log("Success adding articles!", summarizedArticles);
        return res
          .status(200)
          .json({ message: "Success adding articles!", summarizedArticles });
      } else {
        return res.status(200).json({ message: "No new articles added" });
      }
    } else {
      return res.status(200).json({ message: "No new case files found" });
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = case_files;
