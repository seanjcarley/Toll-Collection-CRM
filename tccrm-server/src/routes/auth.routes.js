const router = require('express').Router();
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { login, reset_password } = require('../controllers/auth.controller');


const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
});

const resetPasswordSchema = z.object({
    password: z.string().min(8),
    id: z.string(),
})

router.post('/login', validate(loginSchema), login);
router.post('/reset_password', validate(resetPasswordSchema), reset_password);

module.exports = router;
