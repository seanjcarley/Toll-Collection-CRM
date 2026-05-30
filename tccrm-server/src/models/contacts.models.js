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

async function fetchContactChannels() {
    const [rows] = await db.query(
        `select MEDADATADESC 
        from meta_data 
        where METADATAPARENTID = 8`
    );
    // console.log('models: ', rows)
    return rows || null;
}

module.exports = { fetchGlobalStats, fetchAgentStats, fetchContactChannels };