const express = require("express");
const stats = express.Router();
const {
  getStatsByUserId,
  updateUserStats,
  createUserStats,
} = require("../queries/stats");

// http://localhost:3003/api/stats/1
stats.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const userStats = await getStatsByUserId(user_id);
  if (userStats.id) {
    res.status(200).json(userStats);
  } else {
    res.status(500).json({ error: "Error fetching user stats" });
  }
});

// http://localhost:3003/api/stats/1
stats.put("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { id, xp, games_played, questions_correct, questions_wrong } = req.body;
  const userStats = await getStatsByUserId(user_id);
  if (!userStats) {
    return res.status(404).json({ error: "User stats not found" });
  }
  const updatedUserStats = await updateUserStats({
    user_id,
    id,
    xp: userStats.xp + xp,
    games_played: userStats.games_played + games_played,
    questions_correct: userStats.questions_correct + questions_correct,
    questions_wrong: userStats.questions_wrong + questions_wrong,
  });
  if (updatedUserStats.id) {
    res.status(200).json(updatedUserStats);
  } else {
    res.status(404).json({ error: "User stats not updated" });
  }
});

module.exports = stats;
