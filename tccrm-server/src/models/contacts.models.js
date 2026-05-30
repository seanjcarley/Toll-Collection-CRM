const { db } = require('../config/db');

// return the global stats for the agent dashboard
async function fetchGlobalStats() {
    const [rows] = await db.query(
        `call sp_FetchGlobalStats`
    );

    // console.log(rows[0]);
    return rows[0] || null;
}

// return the global stats for the agent dashboard
async function fetchAgentStats(id) {
    const [rows] = await db.query(
        `call sp_FetchAgentStats(?)`, [Number(id)]
    );

    // console.log(rows[0]);
    return rows[0] || null;
}

module.exports = { fetchGlobalStats, fetchAgentStats };