const router = require('express').Router();
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { fetch_global, fetch_agent, fetch_channels, submit_contact } = require('../controllers/contacts.controller');

const agentStatsSchema = z.object({
    id: z.string(),
})

const submitContactSchema = z.object({
    email: z.string().email(),
    phone: z.string().min(9),
    fname: z.string().min(3),
    surname: z.string().min(3),
    vrn: z.string().min(4),
    query: z.string().min(4),
    channel: z.string().min(5),
    id: z.string(),
})

router.post('/fetch_global', fetch_global);
router.post('/fetch_channels', fetch_channels);
router.post('/fetch_agent', validate(agentStatsSchema), fetch_agent);
router.post('/submit_contact', validate(submitContactSchema), submit_contact);


module.exports = router