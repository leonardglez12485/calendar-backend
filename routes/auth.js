const express = require('express');
const routes = express.Router();
const {check} = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validators');
const { tokenValidator } = require('../middlewares/token-validato');


routes.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        check('password', 'Password must contain at least one number').matches(/\d/),
        fieldValidator
    ],
    createUser
);

routes.post(
    '/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        check('password', 'Password must contain at least one number').matches(/\d/),
        fieldValidator
    ],
    login
);

routes.get('/renew-token', tokenValidator , renewToken);

module.exports = routes;