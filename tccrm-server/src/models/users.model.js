const { db } = require('../config/db');
const { asyncHandler } = require('../utils/asyncHandler');

// find if agent exists on the db
async function findAgentByUsername(username) {
    const [rows] = await db.query(
        `select AGENTID from agents where USERNAME = ?;`, [username]
    );

    return rows[0] || null;
}


module.exports = { findAgentByUsername };