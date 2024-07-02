const db = require("../db/dbConfig");

const getAllYoungerQuestionsAndAnswers = async (case_files_id) => {
  try {
    const allYoungerQuestions = await db.any(
      `SELECT * FROM questions_younger WHERE questions_younger.case_files_id =$1`,
      case_files_id
    );
    return allYoungerQuestions;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllYoungerQuestionsAndAnswers };
