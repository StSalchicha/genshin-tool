const db = require('../models/connection');

const getMisPersonajes = async (req, res) => {
    const { usuario_id } = req.params; 
    try {
        const query = `
            SELECT up.id, up.usuario_id, up.personaje_id, p.nombre, p.vision, 
                   up.max_hp, up.atk, up.def, up.elemental_mastery, 
                   up.crit_rate, up.crit_dmg, up.energy_recharge, up.vision_dmg_bonus
            FROM usuarios_personajes up
            JOIN personajes p ON up.personaje_id = p.id
            WHERE up.usuario_id = $1
            ORDER BY up.id ASC;
        `;
        const result = await db.query(query, [usuario_id]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener tus personajes' });
    }
};

const addPersonajeUsuario = async (req, res) => {
    const { usuario_id, personaje_id } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO usuarios_personajes (usuario_id, personaje_id) VALUES ($1, $2) RETURNING *',
            [usuario_id, personaje_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        if (error.code === '23505') { 
            return res.status(400).json({ error: 'Ya tienes este personaje en tu cuenta' });
        }
        res.status(500).json({ error: 'Error al agregar el personaje a tu cuenta' });
    }
};

const updateStatsPersonaje = async (req, res) => {
    const { id } = req.params;
    const { max_hp, atk, def, elemental_mastery, crit_rate, crit_dmg, energy_recharge, vision_dmg_bonus } = req.body;
    
    try {
        const query = `
            UPDATE usuarios_personajes 
            SET max_hp = $1, atk = $2, def = $3, elemental_mastery = $4, 
                crit_rate = $5, crit_dmg = $6, energy_recharge = $7, vision_dmg_bonus = $8
            WHERE id = $9 
            RETURNING *;
        `;
        const values = [max_hp, atk, def, elemental_mastery, crit_rate, crit_dmg, energy_recharge, vision_dmg_bonus, id];
        
        const result = await db.query(query, values);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registro de personaje no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar las estadísticas' });
    }
};

const deletePersonajeUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM usuarios_personajes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.status(200).json({ message: 'Personaje eliminado de tu cuenta correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el personaje' });
    }
};

module.exports = {
    getMisPersonajes,
    addPersonajeUsuario,
    updateStatsPersonaje,
    deletePersonajeUsuario
};