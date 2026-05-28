const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { asyncHandler } = require('../utils/asyncHandler');

const { findAgentByUsername, resetPassword } = require('../models/users.model');

// agent login 
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await findAgentByUsername(username);
    console.log(user);

    if (!user) {
        const err = new Error('Invalid details. Please try again, or contact IT!');
        err.statusCode = 409;
        throw err;
    }
    
    if (user.ISACTIVE === 0) {
        const err = new Error('Please reset your password!');
        err.statusCode = 520;
        throw err;
    }

    const token = jwt.sign(
        { sub: user.AGENTID, username: user.USERNAME },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN },
    );

    res.json({ ok: true, token, id: user.AGENTID});
})


// reset agent password
const reset_password = asyncHandler(async (req, res) => {
    const { password, id } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const results = await resetPassword
})


module.exports = { login, reset_password };