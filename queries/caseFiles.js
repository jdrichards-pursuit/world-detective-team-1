const db = require("../db/dbConfig");

// CREATE
const addCaseFile = async (file) => {
  try {
    const newCaseFile = await db.one(
      `INSERT INTO case_files(countries_id, article_content, article_title, publish_date) VALUES($1, $2, $3, $4) RETURNING *`,
      [
        file.countries_id,
        file.article_content,
        file.article_title,
        file.publish_date,
      ]
    );
    return newCaseFile;
  } catch (error) {
    return error;
  }
};

const getCaseFilesByCountry = async (countries_id) => {
  try {
    const allCaseFilesByCountry = await db.any(
      `SELECT * FROM case_files WHERE case_files.countries_id = $1`,
      countries_id
    );
    return allCaseFilesByCountry;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addCaseFile,
  getCaseFilesByCountry,
};
