const db = require("../db/dbConfig");


const getStatsByUserId= async (user_id) => {
    try {
        const statsByUserId  = await db.any(`SELECT * FROM stats WHERE stats.user_id = $1`, user_id);
        return statsByUserId
    } catch (error) {
        return error;
    }
};


module.exports = {
    getStatsByUserId
  };