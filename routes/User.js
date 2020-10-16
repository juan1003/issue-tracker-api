const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

router.post('/register',async (req, res) => {
    try {
        const {firstName, lastName, username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 15);
        await models.User.create({firstName: firstName, lastName: lastName, username: username, password: hashedPassword});
        res.status(201).send({ message: 'You have been registered successfully!'});
    } catch(error) {
        console.error(error.message, error.stack);
        res.status(500).send({message: 'Something wrong happened. Please try again'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await models.User.findOne({where: {username: username}});

        if(!user)
            res.send({message: "User with that username not found"});

        const pass = await bcrypt.compare(password, user.dataValues.password);

        if(!pass) {
            res.send({message: "Invalid username or password", pass: pass});
        } 

        const token = jwt.sign({username: username, password: password}, process.env.SECRET, {algorithm: 'HS256'});
        res.send({message: 'Logged in successfully', token: token});

    } catch(error) {
        console.error(error.message, error.stack);
    }
});


module.exports = router;