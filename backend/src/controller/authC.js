const db = require('../models/connection');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query(
            'SELECT id, username FROM usuarios WHERE username = $1 AND password_hash = $2',
            [username, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al intentar iniciar sesión' });
    }
};

const registrar = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2) RETURNING id, username',
            [username, password]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);

        if (error.code === '23505') {
            return res.status(400).json({ error: 'Ese nombre de usuario ya está en uso' });
        }
        
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

module.exports = {
    login,
    registrar
};