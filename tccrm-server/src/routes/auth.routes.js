const router = require('express').Router();
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { login } = require('../controllers/auth.controller');

const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
});

router.post('/login', validate(loginSchema), login);

module.exports = router;
