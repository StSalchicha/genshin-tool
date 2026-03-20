const express = require('express');
const app = express();
const cors = require("cors");
const db = require('./src/models/connection.js');

app.use(express.json());
app.use(cors());

const testRoutes = require('./src/routes/testR.js');

const usuariosPersonajesRoutes = require('./src/routes/usuariosPersonajesR.js');
const personajesRoutes = require('./src/routes/personajesR.js');

const usuariosArmasRoutes = require('./src/routes/usuariosArmasR.js');
const armasRoutes = require('./src/routes/armasR.js');

const authRoutes = require('./src/routes/authR.js');

app.use("/api/test", testRoutes);

app.use("/api/mis-personajes", usuariosPersonajesRoutes);
app.use("/api/catalogo-personajes", personajesRoutes);

app.use("/api/mis-armas", usuariosArmasRoutes);
app.use("/api/catalogo-armas", armasRoutes);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) console.error("Error starting server:", err);
    console.log(`Listening on port ${PORT}`);
});

db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("ERROR CRITICO DE BASE DE DATOS:", err.message);
    } else {
        console.log("BASE DE DATOS CONECTADA.");
    }
});