CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personajes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    vision VARCHAR(50) NOT NULL
);

CREATE TABLE usuarios_personajes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    personaje_id INT REFERENCES personajes(id) ON DELETE CASCADE,
    
    -- Estadísticas (Stats)
    max_hp INT DEFAULT 0,
    atk INT DEFAULT 0,
    def INT DEFAULT 0,
    elemental_mastery INT DEFAULT 0,
    crit_rate DECIMAL(5,2) DEFAULT 5.00,
    crit_dmg DECIMAL(5,2) DEFAULT 50.00,
    energy_recharge DECIMAL(5,2) DEFAULT 100.00,
    vision_dmg_bonus DECIMAL(5,2) DEFAULT 0.00,
    
    UNIQUE(usuario_id, personaje_id) 
);

CREATE TABLE armas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    rareza INT NOT NULL CHECK (rareza >= 1 AND rareza <= 5),
    stat_tipo VARCHAR(50) NOT NULL
);

CREATE TABLE usuarios_armas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    arma_id INT REFERENCES armas(id) ON DELETE CASCADE,
    
    lvl INT DEFAULT 1,
    refinement_rank INT DEFAULT 1 CHECK (refinement_rank >= 1 AND refinement_rank <= 5),
    
    base_atk INT DEFAULT 0,
    stat_valor DECIMAL(7,2) DEFAULT 0.00 
);