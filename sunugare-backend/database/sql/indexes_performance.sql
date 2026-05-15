-- Index composites pour recherche de voyages (très fréquent)
ALTER TABLE voyages
    ADD INDEX idx_voyage_search (origine, destination, heure_depart, statut),
    ADD INDEX idx_voyage_date_statut (heure_depart, statut, places_disponibles);

-- Index pour les statistiques du dashboard
ALTER TABLE reservations
    ADD INDEX idx_reservation_stats (statut, date_reservation, montant_total),
    ADD INDEX idx_reservation_voyage_statut (voyage_id, statut);

-- Index pour les rapports journaliers/mensuels
ALTER TABLE reservations
    ADD INDEX idx_date_month (date_reservation);

-- Index pour la recherche chauffeur par permis
ALTER TABLE chauffeurs
    ADD INDEX idx_permis (numero_permis, date_expiration_permis);

-- Index pour la disponibilité des véhicules
ALTER TABLE vehicules
    ADD INDEX idx_vehicule_statut_capacite (statut, capacite);

-- Vue matérialisée pour les stats rapides (optionnel MySQL 8+)
CREATE OR REPLACE VIEW v_stats_ventes AS
SELECT
    DATE(r.date_reservation) AS jour,
    COUNT(r.id)              AS nombre_reservations,
    SUM(r.montant_total)     AS chiffre_affaires,
    SUM(r.nombre_places)     AS places_vendues
FROM reservations r
WHERE r.statut = 'confirmee'
  AND r.deleted_at IS NULL
GROUP BY DATE(r.date_reservation);
