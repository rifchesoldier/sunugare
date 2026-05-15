-- ══════════════════════════════════════════════════════════════════
-- SUNUGARE — Données de démonstration
-- Exécuter dans MySQL après vos migrations
-- ══════════════════════════════════════════════════════════════════

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = '';

-- ══════════════════════════════════════════════════════════════════
-- 1. USERS (admin + vendeurs)
-- ══════════════════════════════════════════════════════════════════
TRUNCATE TABLE users;

INSERT INTO users (name, email, password, role, actif, created_at, updated_at) VALUES
('Administrateur',    'admin@sunugare.sn',    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXi6N3WFe', 'admin',   1, NOW(), NOW()),
('Amadou Diallo',     'amadou@sunugare.sn',   '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXi6N3WFe', 'vendeur', 1, NOW(), NOW()),
('Fatou Sall',        'fatou@sunugare.sn',    '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXi6N3WFe', 'vendeur', 1, NOW(), NOW()),
('Moussa Ndiaye',     'moussa@sunugare.sn',   '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXi6N3WFe', 'vendeur', 1, NOW(), NOW()),
('Aissatou Ba',       'aissatou@sunugare.sn', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXi6N3WFe', 'vendeur', 1, NOW(), NOW()),
('Ibrahima Gueye',    'ibrahima@sunugare.sn', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uXi6N3WFe', 'vendeur', 0, NOW(), NOW());
-- Mot de passe pour tous : "password"

-- ══════════════════════════════════════════════════════════════════
-- 2. CHAUFFEURS
-- ══════════════════════════════════════════════════════════════════
TRUNCATE TABLE chauffeurs;

INSERT INTO chauffeurs (nom_complet, telephone, numero_permis, date_expiration_permis, statut, created_at, updated_at) VALUES
('Cheikh Mbaye',      '771234501', 'SN-DK-2021-001', '2026-08-15', 'disponible',  NOW(), NOW()),
('Pape Diop',         '772345602', 'SN-DK-2020-002', '2025-12-20', 'disponible',  NOW(), NOW()),
('Oumar Sarr',        '773456703', 'SN-DK-2022-003', '2027-03-10', 'en_service',  NOW(), NOW()),
('Lamine Faye',       '774567804', 'SN-DK-2019-004', '2025-06-30', 'disponible',  NOW(), NOW()),
('Aliou Cisse',       '775678905', 'SN-TH-2021-005', '2026-11-05', 'en_service',  NOW(), NOW()),
('Mamadou Diouf',     '776789006', 'SN-DK-2023-006', '2028-01-18', 'disponible',  NOW(), NOW()),
('Babacar Thiam',     '777890107', 'SN-KL-2020-007', '2025-09-22', 'conge',       NOW(), NOW()),
('Seydou Niang',      '778901208', 'SN-DK-2022-008', '2027-07-14', 'disponible',  NOW(), NOW());

-- ══════════════════════════════════════════════════════════════════
-- 3. VEHICULES
-- ══════════════════════════════════════════════════════════════════
TRUNCATE TABLE vehicules;

INSERT INTO vehicules (immatriculation, marque, modele, capacite, statut, created_at, updated_at) VALUES
('DK-1234-A', 'Mercedes',  'Sprinter 519',  30, 'disponible',  NOW(), NOW()),
('DK-5678-B', 'Toyota',    'Coaster 2022',  25, 'disponible',  NOW(), NOW()),
('DK-9012-C', 'Renault',   'Master L3H2',   20, 'en_service',  NOW(), NOW()),
('TH-3456-D', 'Mercedes',  'Sprinter 416',  30, 'disponible',  NOW(), NOW()),
('DK-7890-E', 'Ford',      'Transit 430',   15, 'en_service',  NOW(), NOW()),
('KL-1122-F', 'Toyota',    'Hiace 2021',    14, 'disponible',  NOW(), NOW()),
('DK-3344-G', 'Mercedes',  'Vito 119',      8,  'maintenance', NOW(), NOW()),
('ZG-5566-H', 'Volkswagen','Crafter 35',    20, 'disponible',  NOW(), NOW()),
('DK-7788-I', 'Peugeot',   'Boxer L3H2',   16, 'disponible',  NOW(), NOW());

-- ══════════════════════════════════════════════════════════════════
-- 4. VOYAGES
-- ══════════════════════════════════════════════════════════════════
TRUNCATE TABLE voyages;

INSERT INTO voyages (origine, destination, prix, heure_depart, heure_arrivee_estimee, places_disponibles, vehicule_id, chauffeur_id, statut, created_at, updated_at) VALUES

-- Aujourd'hui
('Dakar',     'Thiès',        2500,  DATE_ADD(NOW(), INTERVAL 1  HOUR),  DATE_ADD(NOW(), INTERVAL 3  HOUR),  30,  1, 1, 'disponible', NOW(), NOW()),
('Dakar',     'Saint-Louis',  5500,  DATE_ADD(NOW(), INTERVAL 2  HOUR),  DATE_ADD(NOW(), INTERVAL 7  HOUR),  25,  2, 2, 'disponible', NOW(), NOW()),
('Dakar',     'Kaolack',      3500,  DATE_ADD(NOW(), INTERVAL 3  HOUR),  DATE_ADD(NOW(), INTERVAL 6  HOUR),  30,  4, 4, 'disponible', NOW(), NOW()),
('Dakar',     'Ziguinchor',   9000,  DATE_ADD(NOW(), INTERVAL 4  HOUR),  DATE_ADD(NOW(), INTERVAL 12 HOUR),  20,  3, 3, 'en_cours',   NOW(), NOW()),
('Thiès',     'Dakar',        2500,  DATE_ADD(NOW(), INTERVAL 1  HOUR),  DATE_ADD(NOW(), INTERVAL 3  HOUR),  25,  2, 2, 'disponible', NOW(), NOW()),
('Dakar',     'Tambacounda',  8000,  DATE_ADD(NOW(), INTERVAL 5  HOUR),  DATE_ADD(NOW(), INTERVAL 12 HOUR),  15,  5, 5, 'disponible', NOW(), NOW()),
('Dakar',     'Touba',        4000,  DATE_ADD(NOW(), INTERVAL 6  HOUR),  DATE_ADD(NOW(), INTERVAL 10 HOUR),  30,  1, 1, 'disponible', NOW(), NOW()),
('Kaolack',   'Dakar',        3500,  DATE_ADD(NOW(), INTERVAL 2  HOUR),  DATE_ADD(NOW(), INTERVAL 5  HOUR),  14,  6, 6, 'disponible', NOW(), NOW()),

-- Demain
('Dakar',     'Thiès',        2500,  DATE_ADD(NOW(), INTERVAL 25 HOUR),  DATE_ADD(NOW(), INTERVAL 27 HOUR),  30,  4, 4, 'disponible', NOW(), NOW()),
('Dakar',     'Saint-Louis',  5500,  DATE_ADD(NOW(), INTERVAL 26 HOUR),  DATE_ADD(NOW(), INTERVAL 31 HOUR),  20,  8, 8, 'disponible', NOW(), NOW()),
('Dakar',     'Ziguinchor',   9000,  DATE_ADD(NOW(), INTERVAL 27 HOUR),  DATE_ADD(NOW(), INTERVAL 39 HOUR),  20,  3, 3, 'disponible', NOW(), NOW()),
('Thiès',     'Saint-Louis',  4000,  DATE_ADD(NOW(), INTERVAL 28 HOUR),  DATE_ADD(NOW(), INTERVAL 32 HOUR),  14,  6, 6, 'disponible', NOW(), NOW()),

-- Passé (terminés, pour les stats)
('Dakar',     'Thiès',        2500,  DATE_SUB(NOW(), INTERVAL 2  HOUR),  DATE_SUB(NOW(), INTERVAL 0 HOUR),   0,  1, 1, 'complet',    DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Dakar',     'Kaolack',      3500,  DATE_SUB(NOW(), INTERVAL 6  HOUR),  DATE_SUB(NOW(), INTERVAL 3 HOUR),   5,  2, 2, 'complet',    DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
('Dakar',     'Touba',        4000,  DATE_SUB(NOW(), INTERVAL 10 HOUR),  DATE_SUB(NOW(), INTERVAL 6 HOUR),   2,  4, 4, 'complet',    DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Dakar',     'Saint-Louis',  5500,  DATE_SUB(NOW(), INTERVAL 30 HOUR),  DATE_SUB(NOW(), INTERVAL 25 HOUR),  0,  8, 8, 'complet',    DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
('Kaolack',   'Dakar',        3500,  DATE_SUB(NOW(), INTERVAL 48 HOUR),  DATE_SUB(NOW(), INTERVAL 45 HOUR),  3,  6, 6, 'complet',    DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY)),
('Dakar',     'Ziguinchor',   9000,  DATE_SUB(NOW(), INTERVAL 72 HOUR),  DATE_SUB(NOW(), INTERVAL 60 HOUR),  1,  3, 3, 'complet',    DATE_SUB(NOW(), INTERVAL 4 DAY), DATE_SUB(NOW(), INTERVAL 4 DAY));

-- ══════════════════════════════════════════════════════════════════
-- 5. RESERVATIONS
-- ══════════════════════════════════════════════════════════════════
TRUNCATE TABLE reservations;

INSERT INTO reservations (voyage_id, user_id, passager_nom, passager_telephone, nombre_places, montant_total, numero_ticket, statut, date_reservation, created_at, updated_at) VALUES

-- Sur voyages passés (confirmées - pour les stats du dashboard)
(13, 2, 'Mamadou Sow',       '771001001', 2, 5000,  'TK-20240101-AA1', 'confirmee', DATE_SUB(NOW(), INTERVAL 2  HOUR),  DATE_SUB(NOW(), INTERVAL 2 HOUR),  DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(13, 2, 'Ndéye Diop',        '771002002', 1, 2500,  'TK-20240101-AA2', 'confirmee', DATE_SUB(NOW(), INTERVAL 2  HOUR),  DATE_SUB(NOW(), INTERVAL 2 HOUR),  DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(13, 3, 'Ibou Fall',         '771003003', 3, 7500,  'TK-20240101-AA3', 'confirmee', DATE_SUB(NOW(), INTERVAL 3  HOUR),  DATE_SUB(NOW(), INTERVAL 3 HOUR),  DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(13, 4, 'Rokhaya Mbengue',   '771004004', 1, 2500,  'TK-20240101-AA4', 'confirmee', DATE_SUB(NOW(), INTERVAL 3  HOUR),  DATE_SUB(NOW(), INTERVAL 3 HOUR),  DATE_SUB(NOW(), INTERVAL 3 HOUR)),
(14, 2, 'Serigne Diallo',    '772001001', 2, 7000,  'TK-20240101-BB1', 'confirmee', DATE_SUB(NOW(), INTERVAL 6  HOUR),  DATE_SUB(NOW(), INTERVAL 6 HOUR),  DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(14, 3, 'Aminata Cisse',     '772002002', 1, 3500,  'TK-20240101-BB2', 'confirmee', DATE_SUB(NOW(), INTERVAL 6  HOUR),  DATE_SUB(NOW(), INTERVAL 6 HOUR),  DATE_SUB(NOW(), INTERVAL 6 HOUR)),
(14, 2, 'Boubacar Ly',       '772003003', 2, 7000,  'TK-20240101-BB3', 'confirmee', DATE_SUB(NOW(), INTERVAL 7  HOUR),  DATE_SUB(NOW(), INTERVAL 7 HOUR),  DATE_SUB(NOW(), INTERVAL 7 HOUR)),
(15, 4, 'Marème Thiam',      '773001001', 3, 12000, 'TK-20240102-CC1', 'confirmee', DATE_SUB(NOW(), INTERVAL 10 HOUR),  DATE_SUB(NOW(), INTERVAL 10 HOUR), DATE_SUB(NOW(), INTERVAL 10 HOUR)),
(15, 2, 'Tidiane Ndiaye',    '773002002', 1, 4000,  'TK-20240102-CC2', 'confirmee', DATE_SUB(NOW(), INTERVAL 10 HOUR),  DATE_SUB(NOW(), INTERVAL 10 HOUR), DATE_SUB(NOW(), INTERVAL 10 HOUR)),
(16, 3, 'Adja Gueye',        '774001001', 2, 11000, 'TK-20240102-DD1', 'confirmee', DATE_SUB(NOW(), INTERVAL 28 HOUR),  DATE_SUB(NOW(), INTERVAL 28 HOUR), DATE_SUB(NOW(), INTERVAL 28 HOUR)),
(16, 4, 'Omar Badji',        '774002002', 3, 16500, 'TK-20240102-DD2', 'confirmee', DATE_SUB(NOW(), INTERVAL 29 HOUR),  DATE_SUB(NOW(), INTERVAL 29 HOUR), DATE_SUB(NOW(), INTERVAL 29 HOUR)),
(16, 2, 'Coumba Kane',       '774003003', 1, 5500,  'TK-20240102-DD3', 'confirmee', DATE_SUB(NOW(), INTERVAL 30 HOUR),  DATE_SUB(NOW(), INTERVAL 30 HOUR), DATE_SUB(NOW(), INTERVAL 30 HOUR)),
(17, 3, 'Cheikh Sall',       '775001001', 2, 7000,  'TK-20240103-EE1', 'confirmee', DATE_SUB(NOW(), INTERVAL 48 HOUR),  DATE_SUB(NOW(), INTERVAL 48 HOUR), DATE_SUB(NOW(), INTERVAL 48 HOUR)),
(17, 4, 'Binta Konaté',      '775002002', 1, 3500,  'TK-20240103-EE2', 'confirmee', DATE_SUB(NOW(), INTERVAL 49 HOUR),  DATE_SUB(NOW(), INTERVAL 49 HOUR), DATE_SUB(NOW(), INTERVAL 49 HOUR)),
(18, 2, 'Moustapha Wade',    '776001001', 4, 36000, 'TK-20240104-FF1', 'confirmee', DATE_SUB(NOW(), INTERVAL 72 HOUR),  DATE_SUB(NOW(), INTERVAL 72 HOUR), DATE_SUB(NOW(), INTERVAL 72 HOUR)),
(18, 3, 'Sokhna Diop',       '776002002', 2, 18000, 'TK-20240104-FF2', 'confirmee', DATE_SUB(NOW(), INTERVAL 73 HOUR),  DATE_SUB(NOW(), INTERVAL 73 HOUR), DATE_SUB(NOW(), INTERVAL 73 HOUR)),

-- Réservations sur voyages à venir (en attente)
(1,  2, 'Papa Gorgui Ndiaye','777001001', 2, 5000,  'TK-TODAY-GG1',   'confirmee', NOW(), NOW(), NOW()),
(1,  3, 'Yacine Sarr',       '777002002', 1, 2500,  'TK-TODAY-GG2',   'confirmee', NOW(), NOW(), NOW()),
(2,  4, 'Diouma Diallo',     '778001001', 2, 11000, 'TK-TODAY-HH1',   'confirmee', NOW(), NOW(), NOW()),
(3,  2, 'Khady Fall',        '778002002', 1, 3500,  'TK-TODAY-HH2',   'confirmee', NOW(), NOW(), NOW()),
(3,  3, 'Awa Ndiaye',        '778003003', 3, 10500, 'TK-TODAY-HH3',   'confirmee', NOW(), NOW(), NOW()),
(7,  4, 'Saliou Mbaye',      '779001001', 2, 8000,  'TK-TODAY-II1',   'confirmee', NOW(), NOW(), NOW()),

-- Annulées (pour tester les stats)
(1,  2, 'Test Annulé 1',     '780001001', 1, 2500,  'TK-ANNUL-JJ1',   'annulee',   DATE_SUB(NOW(), INTERVAL 5 HOUR),  DATE_SUB(NOW(), INTERVAL 5 HOUR),  DATE_SUB(NOW(), INTERVAL 5 HOUR)),
(2,  3, 'Test Annulé 2',     '780002002', 2, 11000, 'TK-ANNUL-JJ2',   'annulee',   DATE_SUB(NOW(), INTERVAL 24 HOUR), DATE_SUB(NOW(), INTERVAL 24 HOUR), DATE_SUB(NOW(), INTERVAL 24 HOUR));

-- ══════════════════════════════════════════════════════════════════
-- 6. Mise à jour des places_disponibles selon les réservations
-- ══════════════════════════════════════════════════════════════════

-- Voyage 1 : 3 places vendues (2+1)
UPDATE voyages SET places_disponibles = places_disponibles - 3 WHERE id = 1;
-- Voyage 2 : 2 places vendues
UPDATE voyages SET places_disponibles = places_disponibles - 2 WHERE id = 2;
-- Voyage 3 : 4 places vendues (1+3)
UPDATE voyages SET places_disponibles = places_disponibles - 4 WHERE id = 3;
-- Voyage 7 : 2 places vendues
UPDATE voyages SET places_disponibles = places_disponibles - 2 WHERE id = 7;

-- ══════════════════════════════════════════════════════════════════
-- 7. INDEX COMPOSITES (vos index existants)
-- ══════════════════════════════════════════════════════════════════

-- Suppression des index existants si déjà créés (évite les doublons)
DROP INDEX IF EXISTS idx_voyage_search        ON voyages;
DROP INDEX IF EXISTS idx_voyage_date_statut   ON voyages;
DROP INDEX IF EXISTS idx_reservation_stats    ON reservations;
DROP INDEX IF EXISTS idx_reservation_voyage_statut ON reservations;
DROP INDEX IF EXISTS idx_date_month           ON reservations;
DROP INDEX IF EXISTS idx_permis               ON chauffeurs;
DROP INDEX IF EXISTS idx_vehicule_statut_capacite ON vehicules;

ALTER TABLE voyages
    ADD INDEX idx_voyage_search        (origine, destination, heure_depart, statut),
    ADD INDEX idx_voyage_date_statut   (heure_depart, statut, places_disponibles);

ALTER TABLE reservations
    ADD INDEX idx_reservation_stats    (statut, date_reservation, montant_total),
    ADD INDEX idx_reservation_voyage_statut (voyage_id, statut),
    ADD INDEX idx_date_month           (date_reservation);

ALTER TABLE chauffeurs
    ADD INDEX idx_permis               (numero_permis, date_expiration_permis);

ALTER TABLE vehicules
    ADD INDEX idx_vehicule_statut_capacite (statut, capacite);

-- ══════════════════════════════════════════════════════════════════
-- 8. VUE pour les stats du dashboard
-- ══════════════════════════════════════════════════════════════════
CREATE OR REPLACE VIEW v_stats_ventes AS
SELECT
    DATE(r.date_reservation)  AS jour,
    COUNT(r.id)               AS nombre_reservations,
    SUM(r.montant_total)      AS chiffre_affaires,
    SUM(r.nombre_places)      AS places_vendues
FROM reservations r
WHERE r.statut     = 'confirmee'
  AND r.deleted_at IS NULL
GROUP BY DATE(r.date_reservation);

-- ══════════════════════════════════════════════════════════════════
-- VÉRIFICATION — lancez ces requêtes pour confirmer
-- ══════════════════════════════════════════════════════════════════
-- SELECT COUNT(*) FROM users;           -- doit afficher 6
-- SELECT COUNT(*) FROM chauffeurs;      -- doit afficher 8
-- SELECT COUNT(*) FROM vehicules;       -- doit afficher 9
-- SELECT COUNT(*) FROM voyages;         -- doit afficher 18
-- SELECT COUNT(*) FROM reservations;    -- doit afficher 24
-- SELECT * FROM v_stats_ventes;         -- stats par jour

SET FOREIGN_KEY_CHECKS = 1;
