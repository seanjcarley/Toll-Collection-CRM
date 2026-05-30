const router = require('express').Router();
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { fetch_global, fetch_agent, fetch_channels } = require('../controllers/contacts.controller');

const agentStatsSchema = z.object({
    id: z.string(),
})

router.post('/fetch_global', fetch_global);
router.post('/fetch_channels', fetch_channels);
router.post('/fetch_agent', validate(agentStatsSchema), fetch_agent);

module.exports = router