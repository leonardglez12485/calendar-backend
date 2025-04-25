const express = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');
const routes = express.Router();

routes.post('/register', createUser);

routes.post('/', login);

routes.get('/renew-token', renewToken);

module.exports = routes;