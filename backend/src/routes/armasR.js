const express = require('express');
const router = express.Router();
const funciones = require('../controller/armasC');

router.get("/", funciones.getCatalogoArmas);

module.exports = router;