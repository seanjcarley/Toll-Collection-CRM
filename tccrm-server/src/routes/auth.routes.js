const router = require('express').Router();
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { login } = require('../controllers/auth.controller');
const { resetPassword } = require('../models/users.model');

const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
});

const resetPasswordSchema = z.object({
    password: z.string().min(8),
    id: z.string(),
})

router.post('/login', validate(loginSchema), login);
router.post('/reset_password', validate(resetPasswordSchema), resetPassword);

module.exports = router;
