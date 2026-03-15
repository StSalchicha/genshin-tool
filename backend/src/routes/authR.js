const express = require('express');
const router = express.Router();
const authC = require('../controller/authC');

router.post('/login', authC.login);

router.post('/register', authC.registrar);

module.exports = router;