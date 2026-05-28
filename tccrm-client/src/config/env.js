// src/config/env.js

const path = require('path');
require('donenv').config({
    path: path.join(__dirname, '../../.env')
});

const env = {
    API_BASE_URL: process.env.VITE_API_BASE_URL
}

const required = ['API_BASE_URL'];

for (const key of required) {
    if (!env[key]) throw new Error(`Missing environment variable: ${key}`);
}

module.exports = { env };