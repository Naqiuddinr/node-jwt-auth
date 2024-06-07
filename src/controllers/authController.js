const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

//Function to handle Errors
const handleError = (err) => {
    console.log("err.code");
    let errors = { email: '', password: '' };

    //validate duplicate email
    if (err.code === 11000) {
        errors.email = 'This email has already registered';
        return errors;
    }

    //validation error
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors
}

//Function to create a JWT Token
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.secretKey, {
        expiresIn: maxAge
    })
}

//controller for login GET request
module.exports.login_get = (req, res) => {
    res.send('login page');
}

//controller for signup GET request
module.exports.signup_get = (req, res) => {
    res.send('signup page');
}

//controller for signup POST request
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {

        const response = await User.create({ email, password });
        const token = createToken(response._id);
        res.cookie('token', token, { httpOnly: true, secure: false });
        res.status(201).json({ user: response._id });

    } catch (err) {
        const errors = handleError(err)
        res.status(400).json({ errors })
    }
}

//controller for login POST request
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {

    } catch (err) {

    }
}