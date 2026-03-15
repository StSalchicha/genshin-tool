const db = require('../models/connection');

const getCatalogoArmas = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM armas ORDER BY rareza DESC, nombre ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el catálogo de armas' });
    }
};

module.exports = { getCatalogoArmas };