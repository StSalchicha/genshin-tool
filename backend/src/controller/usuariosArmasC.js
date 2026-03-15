const db = require('../models/connection');

const getMisArmas = async (req, res) => {
    const { usuario_id } = req.params; 
    try {
        const query = `
            SELECT ua.id, ua.usuario_id, ua.arma_id, a.nombre, a.rareza, a.stat_tipo,
                   ua.lvl, ua.refinement_rank, ua.base_atk, ua.stat_valor
            FROM usuarios_armas ua
            JOIN armas a ON ua.arma_id = a.id
            WHERE ua.usuario_id = $1
            ORDER BY ua.id ASC;
        `;
        const result = await db.query(query, [usuario_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener tus armas' });
    }
};

const addArmaUsuario = async (req, res) => {
    const { usuario_id, arma_id } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO usuarios_armas (usuario_id, arma_id) VALUES ($1, $2) RETURNING *',
            [usuario_id, arma_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el arma a tu inventario' });
    }
};

const updateStatsArma = async (req, res) => {
    const { id } = req.params;
    const { lvl, refinement_rank, base_atk, stat_valor } = req.body;
    
    try {
        const query = `
            UPDATE usuarios_armas 
            SET lvl = $1, refinement_rank = $2, base_atk = $3, stat_valor = $4
            WHERE id = $5 
            RETURNING *;
        `;
        const result = await db.query(query, [lvl, refinement_rank, base_atk, stat_valor, id]);
        
        if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar las estadísticas del arma' });
    }
};

const deleteArmaUsuario = async (req, res) => {
    const { id } = req.params; 
    try {
        const result = await db.query('DELETE FROM usuarios_armas WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Registro no encontrado' });
        res.status(200).json({ message: 'Arma eliminada de tu cuenta' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el arma' });
    }
};

module.exports = { getMisArmas, addArmaUsuario, updateStatsArma, deleteArmaUsuario };