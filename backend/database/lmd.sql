INSERT INTO usuarios (username, password_hash) 
VALUES ('plateaucake', 'qwertyuiop');

INSERT INTO personajes (nombre, vision) VALUES 
('Hu Tao', 'Pyro'),
('Zhongli', 'Geo'),
('Raiden Shogun', 'Electro'),
('Kamisato Ayaka', 'Cryo');

INSERT INTO armas (nombre, rareza, stat_tipo) VALUES 
('Staff of Homa', 5, 'CRIT DMG'),
('Wolfs Gravestone', 5, 'ATK%'),
('The Catch', 4, 'Energy Recharge'),
('Favonius Sword', 4, 'Energy Recharge');

INSERT INTO usuarios_personajes (usuario_id, personaje_id, max_hp, atk, def, elemental_mastery, crit_rate, crit_dmg, energy_recharge, vision_dmg_bonus) VALUES 
(1, 1, 31000, 1200, 800, 150, 65.50, 210.00, 100.00, 46.60),
(1, 2, 45000, 900, 1100, 0, 50.00, 120.00, 130.00, 28.80);

INSERT INTO usuarios_armas (usuario_id, arma_id, lvl, refinement_rank, base_atk, stat_valor) VALUES 
(1, 1, 90, 1, 608, 66.20),
(1, 3, 90, 5, 510, 45.90);

INSERT INTO personajes (nombre, vision) VALUES 
('Nahida', 'Dendro'),
('Furina', 'Hydro'),
('Neuvillette', 'Hydro'),
('Kaedehara Kazuha', 'Anemo'),
('Alhaitham', 'Dendro'),
('Yelan', 'Hydro'),
('Arataki Itto', 'Geo'),
('Xiao', 'Anemo'),
('Tartaglia', 'Hydro'),
('Ganyu', 'Cryo');

INSERT INTO armas (nombre, rareza, stat_tipo) VALUES 
('Aqua Simulacra', 5, 'CRIT DMG'),
('Mistsplitter Reforged', 5, 'CRIT DMG'),
('Engulfing Lightning', 5, 'Energy Recharge'),
('A Thousand Floating Dreams', 5, 'Elemental Mastery'),
('Primordial Jade Winged-Spear', 5, 'CRIT Rate'),
('The Widsith', 4, 'CRIT DMG'),
('Serpent Spine', 4, 'CRIT Rate'),
('Rust', 4, 'ATK%'),
('Prototype Amber', 4, 'HP%'),
('Thrilling Tales of Dragon Slayers', 3, 'HP%');