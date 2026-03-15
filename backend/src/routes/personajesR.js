const express = require('express');
const router = express.Router();
const funciones = require('../controller/personajesC');

router.get("/", funciones.getCatalogoPersonajes);

module.exports = router;