const User = require('../models/UserModel')

module.exports.login_get = (req, res) => {
    res.send('login page');
}

module.exports.signup_get = (req, res) => {
    res.send('signup page');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {

        const response = await User.create({ email, password });
        res.status(201).json(response);

    } catch (err) {
        console.error(err.message)
        res.status(400).send('Error, user not created')
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {

    } catch (err) {

    }
}