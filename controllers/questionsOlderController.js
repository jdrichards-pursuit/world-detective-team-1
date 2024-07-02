const express = require('express')
const older_questions = express.Router()
const {getAllOlderQuestionsAndAnswers} = require("../queries/questionsOlder")

//QUESTIONS and ANSWERS http://localhost:3003/api/older_questions/1
older_questions.get('/:case_files_id', async (req,res) => {
    const { case_files_id } = req.params
    const allQuestionsWithAnswers = await getAllOlderQuestionsAndAnswers(case_files_id);

    if(allQuestionsWithAnswers[0]){
        res.status(200).json(allQuestionsWithAnswers);
    } else {
        res.status(500).json({ error: "Error fetching questions and answers"})
    }
});

module.exports = older_questions