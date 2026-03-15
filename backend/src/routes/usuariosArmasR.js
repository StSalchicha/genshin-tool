const express = require('express');
const router = express.Router();

const funciones = require('../controller/usuariosArmasC');

router.get("/:usuario_id", funciones.getMisArmas);
router.post("/", funciones.addArmaUsuario);
router.put("/:id", funciones.updateStatsArma);
router.delete("/:id", funciones.deleteArmaUsuario);

module.exports = router;