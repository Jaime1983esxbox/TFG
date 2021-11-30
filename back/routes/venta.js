'use strict'

var express = require('express');
var ventaController = require('../controllers/VentaController');

var api = express.Router();
var auth = require('../middlewares/authenticate');

// Para vincular a las funciones 
api.post('/registro_compra_cliente', auth.auth, ventaController.registro_compra_cliente);

// Exportar la inicialización de la ruta y el controlador de Cliente
module.exports = api;