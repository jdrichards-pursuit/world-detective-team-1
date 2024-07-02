const db = require("../db/dbConfig");

// INDEX
const getAllCountries = async () => {
    try {
        const allCountries = await db.any(`SELECT * FROM countries`);
        return allCountries
    } catch (error) {
        return error;
    }
};

const getCaseFilesByCountry = async (countries_id) => {
    try {
        const allCaseFilesByCountry = await db.any(`SELECT * FROM case_files WHERE case_files.countries_id = $1`, countries_id);
        return allCaseFilesByCountry
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAllCountries,
    getCaseFilesByCountry
  };