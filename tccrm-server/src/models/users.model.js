const { db } = require('../config/db');

// find if agent exists on the db
async function findAgentByUsername(username) {
    const [rows] = await db.query(
        `select AGENTID, ISACTIVE from agents where USERNAME = ?;`, [username]
    );

    return rows[0] || null;
}

// reset agent password
async function resetPassword(password, id) {
    console.log('user,models: ', password);
    const [results] = await db.query(
        `call sp_ResetAgentPassword(?, ?)`, [password, id]
    );

    return results[0] || null
}

module.exports = { findAgentByUsername, resetPassword };