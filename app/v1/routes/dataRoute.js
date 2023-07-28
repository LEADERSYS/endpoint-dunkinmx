const express = require('express');
const authenticateToken = require('../../middlewares/AuthMiddleware');
const obtenerSucursales = require('../../controller/SucursalesController');
const filtros = require('../../validators/FiltrosValidator');
const obtenerFiltros = require('../../controller/FiltrosController');
const dataRouter = express.Router();

dataRouter.get('/sucursales', authenticateToken, obtenerSucursales);
dataRouter.post('/filtros', authenticateToken, filtros.validar_campos_filtros, obtenerFiltros);

module.exports = dataRouter;
