const db = require("../db/dbConfig");

// INDEX
const getAllOlderQuestionsAndAnswers = async (case_files_id) => {
    try {
        const allOlderQuestionsAndAnswers  = await db.any(`SELECT * FROM questions_older WHERE questions_older.case_files_id = $1`, case_files_id);
        return allOlderQuestionsAndAnswers
    } catch (error) {
        return error;
    }
};


module.exports = {
    getAllOlderQuestionsAndAnswers
  };