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
        where METADATAPARENTID = 8;`
    );
    // console.log('models: ', rows)
    return rows || null;
}

// find if email already exists on the db
async function findUserByEmail(email) {
    const [result] = await db.query(
        `select customers.CUSTOMERID
        from contact_details
        join customers on contact_details.CONTACTID = customers.CONTACTID
        where EMAIL = ?;`, [email]
    );
    // console.log(result[0]);
    return result[0] || null;
}

async function createUser({email, fname, surname, phone, vrn}) {
    console.log('Model: ', {email, fname, surname, phone, vrn});
    const [result] = await db.query(
        `call sp_AddCustomer('DefaultPa$$w0Rd', ?, ?, ?, ?, ?)`, 
        [email, fname, surname, phone, vrn]
    );
    return result.insertId;
}

async function submitContact(
    email, phone, fname, surname, vrn, query, channel, id) {

    // add new user if email address does not exist
    if (await findUserByEmail(email) === null) {
        createUser(email, fname, surname, phone, vrn);
    }

    // get the customer id
    const custId = await findUserByEmail(email);

    // add the contact details
    const [results] = await db.query(
        `call sp_AddContact(?, ?, ?, ?);`, [custId.CUSTOMERID, Number(id), query, channel]
    );

    return results || null;
}

module.exports = { fetchGlobalStats, fetchAgentStats, fetchContactChannels, 
    submitContact };