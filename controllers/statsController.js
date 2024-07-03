const express = require('express')
const stats = express.Router()
const {getStatsByUserId, updateUserStats, createUserStats} = require("../queries/stats")

// http://localhost:3003/api/stats/1
stats.get('/:user_id', async (req,res) => {
    const { user_id } = req.params
    const userStats = await getStatsByUserId(user_id);

    if(userStats[0]){
        res.status(200).json(userStats);
    } else {
        res.status(500).json({ error: "Error fetching user stats"})
    }
});

// UPDATE http://localhost:3003/api/stats/1
stats.put("/:user_id" ,async (req, res) => {
    const { user_id } = req.params
    const updatedUserStats = await updateUserStats({user_id, ...req.body});
    if (updatedUserStats.id) {
      res.status(200).json(updatedUserStats);
    } else {
      res.status(404).json({ error: "User stats not updated" });
    }
  });

  // POST http://localhost:3003/api/stats/1
stats.post("/:user_id" ,async (req, res) => {
    const { user_id } = req.params
    const newUserStats = await createUserStats(user_id)
    if (newUserStats.id) {
      res.status(200).json(newUserStats);
    } else {
      res.status(404).json({ error: "User stats not created" });
    }
  });

module.exports = stats