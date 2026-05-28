const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { asyncHandler } = require('../utils/asyncHandler');

const { findUserByEmail } = require('../models/users.model')

// agent login 
const login = asyncHandler(async (req, res))

module.exports = { testDatabase };