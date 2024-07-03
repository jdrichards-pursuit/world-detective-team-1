const db = require("../db/dbConfig");


const getStatsByUserId = async (user_id) => {
    try {
        const statsByUserId  = await db.any(`SELECT * FROM stats WHERE stats.user_id = $1`, user_id);
        return statsByUserId
    } catch (error) {
        return error;
    }
};

// UPDATE 
const updateUserStats = async (stats) => {
    try {
      const updatedUserStats = await db.one(
        `UPDATE stats SET xp=$1, games_played=$2, questions_correct=$3, questions_wrong=$4 WHERE user_id=$5 RETURNING *`,
        [
          stats.xp,
          stats.games_played,
          stats.questions_correct,
          stats.questions_wrong,
          stats.user_id
        ]
      );
      return updatedUserStats;
    } catch (error) {
      return error;
    }
  };

  // CREATE
const createUserStats = async (user_id) => {
    try {
      const newUserStats = await db.one(
        `INSERT INTO stats(user_id) VALUES($1) RETURNING *`, user_id
      );
      return newUserStats;
    } catch (error) {
      return error;
    }
  };
  


module.exports = {
    getStatsByUserId,
    updateUserStats, 
    createUserStats
  };