const express = require('express')
const stats = express.Router()
const {getStatsByUserId} = require("../queries/stats")

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

module.exports = stats