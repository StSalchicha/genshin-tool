const express = require('express');
const router = express.Router();

const funciones = require('../controller/testC');

router.get("/", funciones.emote);

module.exports = router;