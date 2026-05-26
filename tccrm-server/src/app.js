const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { env } = require('./config/env')

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));

app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
}));

app.get('/health', (req, res) => {
    res.json({ ok: true, message: 'Toll Collection CRM API Running...'});
});

module.exports = { app };