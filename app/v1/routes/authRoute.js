const express = require('express');
const login = require('../../controller/AuthController');
const authRouter = express.Router();

authRouter.post('/login', login);

module.exports = authRouter;
