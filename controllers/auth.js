const {response} = require('express');


const createUser = (req, res = response) => {
    const { name, email, password } = req.body;
    res.status(201).json({
        message: 'User registered successfully',
        status: 'success',
        data: {
            name,
            password,
            email
        },
    });
    
}

const login =  (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        message: 'User logged in successfully',
        status: 'success',
        data: {
            email,
            password, 
        }
    });
    
}

const renewToken = (req, res = response) => {
    res.json({
        message: 'Token renewed successfully',
        status: 'success',
    });
}


module.exports = {
    createUser,
    login,
    renewToken
}