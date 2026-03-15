const db = require('../models/connection');

const getCatalogoPersonajes = async (req, res) => {
    try {
        const result = await db.query('SELECT id, nombre, vision FROM personajes ORDER BY nombre ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el catálogo de personajes' });
    }
};

module.exports = {
    getCatalogoPersonajes
};