const express = require('express');
const router = express.Router();

// Importamos el controlador que hicimos en el paso anterior
const funciones = require('../controller/usuariosPersonajesC');

// CRUD para los personajes del usuario
router.get("/:usuario_id", funciones.getMisPersonajes);        // Leer (Read)
router.post("/", funciones.addPersonajeUsuario);               // Crear/Agregar (Create)
router.put("/:id", funciones.updateStatsPersonaje);            // Actualizar (Update)
router.delete("/:id", funciones.deletePersonajeUsuario);       // Eliminar (Delete)

module.exports = router;