const { db } = require('../config/db');
const { asyncHandler } = require('../utils/asyncHandler');

// find if agent exists on the db


module.exports = { findUserByEmail };