const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes')

const app = express();
const PORT = 3000;
const { dbUri } = process.env;

//middleware
app.use(cors({
    origin: 'http://localhost:5137',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(dbUri) // allow connection to DB before express listening to port
    .then((result) => app.listen(PORT, () => {
        console.log(`DB connected, Server running on http://localhost:${PORT}`);
    }))
    .catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('API Server is running')
})

app.use(authRoutes);


app.get('/set-cookie', (req, res) => {

    res.cookie('newUser', true, { maxAge: 5000, httpOnly: true });
    res.send('You have a cookie!')
})

app.get('/read-cookie', (req, res) => {

    const cookie = req.cookies;
    console.log(cookie)
    res.json(cookie)
})