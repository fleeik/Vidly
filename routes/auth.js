const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid user or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid  password');

    const token = user.generateAuthToken();
    res.send(token);
});

//validate data from request.
function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).required().email(),
        password: Joi.string().required()
    });
    return schema.validate(req);
}

module.exports = router;