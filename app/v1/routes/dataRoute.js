const express = require('express');
const obtenerSucursales = require('../../controller/SucursalesController');
const dataRouter = express.Router();

dataRouter.get('/sucursales', obtenerSucursales);

module.exports = dataRouter;
