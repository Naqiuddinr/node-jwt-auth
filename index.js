const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes')

const app = express();
const PORT = 3000;
const { dbUri } = process.env;

app.use(cors())
app.use(express.json());

mongoose.connect(dbUri) // allow connection to DB before express listening to port
    .then((result) => app.listen(PORT, () => {
        console.log(`DB connected, Server running on http://localhost:${3000}`);
    }))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('API Server is running')
})

app.use(authRoutes);