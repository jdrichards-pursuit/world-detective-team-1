const db = require("../db/dbConfig");

// INDEX
const getAllCountries = async () => {
  try {
    const allCountries = await db.any(`SELECT * FROM countries`);
    return allCountries;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllCountries,
};
