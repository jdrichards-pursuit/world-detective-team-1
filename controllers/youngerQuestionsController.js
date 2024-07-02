const express = require("express");
const youngerQuestions = express.Router();

const {
  getAllYoungerQuestionsAndAnswers,
} = require("../queries/youngerQuestions");

//http://localhost:3003/api/younger_questions/:case_files_id
youngerQuestions.get("/:case_files_id", async (req, res) => {
  const { case_files_id } = req.params;
  const allYoungerquestions = await getAllYoungerQuestionsAndAnswers(
    case_files_id
  );
  if (allYoungerquestions[0]) {
    res.status(200).json(allYoungerquestions);
  } else {
    res.status(500).json({ error: "Error fetching younger questions" });
  }
});

module.exports = youngerQuestions;
