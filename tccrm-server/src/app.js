const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { env } = require('./config/env');
const { db } = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth.routes');
const contactsRoutes = require('./routes/contacts.routes');

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

app.get('/api/test_6202', async (req, res) => {
    const [rows] = await db.query('select * from national_vehicle_file');
    res.json(rows);
})

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactsRoutes);

app.use(errorHandler);

module.exports = { app };