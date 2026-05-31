const { env } = require('../config/env');
const { asyncHandler } = require('../utils/asyncHandler');
const { fetchGlobalStats, fetchAgentStats, fetchContactChannels, 
    submitContact } = require('../models/contacts.models');

const fetch_global = asyncHandler(async (req, res) => {
    const results = await fetchGlobalStats();

    res.status(200).json({ ok: true, results });
})

const fetch_agent = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const results = await fetchAgentStats(id);

    res.status(200).json({ ok: true, results });
})

const fetch_channels = asyncHandler(async (req, res) => {
    const results = await fetchContactChannels();

    // console.log(results);

    res.status(200).json({ ok: true, results });
})

const submit_contact = asyncHandler(async (req, res) => {
    const { email, phone, fname, surname, vrn, query, channel, id } = req.body
    const results = await submitContact(
        email, phone, fname, surname, vrn, query, channel, id);

    res.status(200).json({ ok: true });

})

module.exports = { fetch_global, fetch_agent, fetch_channels, submit_contact };