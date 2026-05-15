<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Désactive les contraintes le temps du seed
        DB::statement('PRAGMA foreign_keys = OFF');

        // Vide les tables
        DB::table('reservations')->delete();
        DB::table('voyages')->delete();
        DB::table('vehicules')->delete();
        DB::table('chauffeurs')->delete();
        DB::table('users')->delete();

        // ── Users ──────────────────────────────────────────────
        $users = [
            ['name' => 'Administrateur',  'email' => 'admin@sunugare.sn',    'role' => 'admin'],
            ['name' => 'Amadou Diallo',   'email' => 'amadou@sunugare.sn',   'role' => 'vendeur'],
            ['name' => 'Fatou Sall',      'email' => 'fatou@sunugare.sn',    'role' => 'vendeur'],
            ['name' => 'Moussa Ndiaye',   'email' => 'moussa@sunugare.sn',   'role' => 'vendeur'],
            ['name' => 'Aissatou Ba',     'email' => 'aissatou@sunugare.sn', 'role' => 'vendeur'],
            ['name' => 'Ibrahima Gueye',  'email' => 'ibrahima@sunugare.sn', 'role' => 'vendeur'],
        ];

        foreach ($users as $u) {
            User::create([
                'name'     => $u['name'],
                'email'    => $u['email'],
                'password' => Hash::make('password'),
                'role'     => $u['role'],
                'actif'    => true,
            ]);
        }

        // ── Chauffeurs ─────────────────────────────────────────
        $chauffeurs = [
            ['nom_complet' => 'Cheikh Mbaye',    'telephone' => '771234501', 'numero_permis' => 'SN-DK-2021-001', 'date_expiration_permis' => '2026-08-15', 'statut' => 'disponible'],
            ['nom_complet' => 'Pape Diop',        'telephone' => '772345602', 'numero_permis' => 'SN-DK-2020-002', 'date_expiration_permis' => '2025-12-20', 'statut' => 'disponible'],
            ['nom_complet' => 'Oumar Sarr',       'telephone' => '773456703', 'numero_permis' => 'SN-DK-2022-003', 'date_expiration_permis' => '2027-03-10', 'statut' => 'en_service'],
            ['nom_complet' => 'Lamine Faye',      'telephone' => '774567804', 'numero_permis' => 'SN-DK-2019-004', 'date_expiration_permis' => '2025-06-30', 'statut' => 'disponible'],
            ['nom_complet' => 'Aliou Cisse',      'telephone' => '775678905', 'numero_permis' => 'SN-TH-2021-005', 'date_expiration_permis' => '2026-11-05', 'statut' => 'en_service'],
            ['nom_complet' => 'Mamadou Diouf',    'telephone' => '776789006', 'numero_permis' => 'SN-DK-2023-006', 'date_expiration_permis' => '2028-01-18', 'statut' => 'disponible'],
            ['nom_complet' => 'Babacar Thiam',    'telephone' => '777890107', 'numero_permis' => 'SN-KL-2020-007', 'date_expiration_permis' => '2025-09-22', 'statut' => 'conge'],
            ['nom_complet' => 'Seydou Niang',     'telephone' => '778901208', 'numero_permis' => 'SN-DK-2022-008', 'date_expiration_permis' => '2027-07-14', 'statut' => 'disponible'],
        ];

        foreach ($chauffeurs as $c) {
            DB::table('chauffeurs')->insert(array_merge($c, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        // ── Véhicules ──────────────────────────────────────────
        $vehicules = [
            ['immatriculation' => 'DK-1234-A', 'marque' => 'Mercedes',   'modele' => 'Sprinter 519',  'capacite' => 30, 'statut' => 'disponible'],
            ['immatriculation' => 'DK-5678-B', 'marque' => 'Toyota',     'modele' => 'Coaster 2022',  'capacite' => 25, 'statut' => 'disponible'],
            ['immatriculation' => 'DK-9012-C', 'marque' => 'Renault',    'modele' => 'Master L3H2',   'capacite' => 20, 'statut' => 'en_service'],
            ['immatriculation' => 'TH-3456-D', 'marque' => 'Mercedes',   'modele' => 'Sprinter 416',  'capacite' => 30, 'statut' => 'disponible'],
            ['immatriculation' => 'DK-7890-E', 'marque' => 'Ford',       'modele' => 'Transit 430',   'capacite' => 15, 'statut' => 'en_service'],
            ['immatriculation' => 'KL-1122-F', 'marque' => 'Toyota',     'modele' => 'Hiace 2021',    'capacite' => 14, 'statut' => 'disponible'],
            ['immatriculation' => 'DK-3344-G', 'marque' => 'Mercedes',   'modele' => 'Vito 119',      'capacite' => 8,  'statut' => 'maintenance'],
            ['immatriculation' => 'ZG-5566-H', 'marque' => 'Volkswagen', 'modele' => 'Crafter 35',    'capacite' => 20, 'statut' => 'disponible'],
            ['immatriculation' => 'DK-7788-I', 'marque' => 'Peugeot',    'modele' => 'Boxer L3H2',    'capacite' => 16, 'statut' => 'disponible'],
        ];

        foreach ($vehicules as $v) {
            DB::table('vehicules')->insert(array_merge($v, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        // ── Voyages ────────────────────────────────────────────
        $voyages = [
            // Aujourd'hui
            ['origine' => 'Dakar',   'destination' => 'Thiès',       'prix' => 2500, 'heure_depart' => now()->addHours(1),  'heure_arrivee_estimee' => now()->addHours(3),  'places_disponibles' => 27, 'vehicule_id' => 1, 'chauffeur_id' => 1, 'statut' => 'disponible'],
            ['origine' => 'Dakar',   'destination' => 'Saint-Louis',  'prix' => 5500, 'heure_depart' => now()->addHours(2),  'heure_arrivee_estimee' => now()->addHours(7),  'places_disponibles' => 23, 'vehicule_id' => 2, 'chauffeur_id' => 2, 'statut' => 'disponible'],
            ['origine' => 'Dakar',   'destination' => 'Kaolack',      'prix' => 3500, 'heure_depart' => now()->addHours(3),  'heure_arrivee_estimee' => now()->addHours(6),  'places_disponibles' => 26, 'vehicule_id' => 4, 'chauffeur_id' => 4, 'statut' => 'disponible'],
            ['origine' => 'Dakar',   'destination' => 'Ziguinchor',   'prix' => 9000, 'heure_depart' => now()->addHours(4),  'heure_arrivee_estimee' => now()->addHours(12), 'places_disponibles' => 20, 'vehicule_id' => 3, 'chauffeur_id' => 3, 'statut' => 'en_cours'],
            ['origine' => 'Thiès',   'destination' => 'Dakar',        'prix' => 2500, 'heure_depart' => now()->addHours(1),  'heure_arrivee_estimee' => now()->addHours(3),  'places_disponibles' => 25, 'vehicule_id' => 2, 'chauffeur_id' => 2, 'statut' => 'disponible'],
            ['origine' => 'Dakar',   'destination' => 'Tambacounda',  'prix' => 8000, 'heure_depart' => now()->addHours(5),  'heure_arrivee_estimee' => now()->addHours(12), 'places_disponibles' => 15, 'vehicule_id' => 5, 'chauffeur_id' => 5, 'statut' => 'disponible'],
            ['origine' => 'Dakar',   'destination' => 'Touba',        'prix' => 4000, 'heure_depart' => now()->addHours(6),  'heure_arrivee_estimee' => now()->addHours(10), 'places_disponibles' => 28, 'vehicule_id' => 1, 'chauffeur_id' => 1, 'statut' => 'disponible'],
            ['origine' => 'Kaolack', 'destination' => 'Dakar',        'prix' => 3500, 'heure_depart' => now()->addHours(2),  'heure_arrivee_estimee' => now()->addHours(5),  'places_disponibles' => 14, 'vehicule_id' => 6, 'chauffeur_id' => 6, 'statut' => 'disponible'],
            // Demain
            ['origine' => 'Dakar',   'destination' => 'Thiès',        'prix' => 2500, 'heure_depart' => now()->addHours(25), 'heure_arrivee_estimee' => now()->addHours(27), 'places_disponibles' => 30, 'vehicule_id' => 4, 'chauffeur_id' => 4, 'statut' => 'disponible'],
            ['origine' => 'Dakar',   'destination' => 'Saint-Louis',  'prix' => 5500, 'heure_depart' => now()->addHours(26), 'heure_arrivee_estimee' => now()->addHours(31), 'places_disponibles' => 20, 'vehicule_id' => 8, 'chauffeur_id' => 8, 'statut' => 'disponible'],
            ['origine' => 'Dakar',   'destination' => 'Ziguinchor',   'prix' => 9000, 'heure_depart' => now()->addHours(27), 'heure_arrivee_estimee' => now()->addHours(39), 'places_disponibles' => 20, 'vehicule_id' => 3, 'chauffeur_id' => 3, 'statut' => 'disponible'],
            ['origine' => 'Thiès',   'destination' => 'Saint-Louis',  'prix' => 4000, 'heure_depart' => now()->addHours(28), 'heure_arrivee_estimee' => now()->addHours(32), 'places_disponibles' => 14, 'vehicule_id' => 6, 'chauffeur_id' => 6, 'statut' => 'disponible'],
            // Passés
            ['origine' => 'Dakar',   'destination' => 'Thiès',        'prix' => 2500, 'heure_depart' => now()->subHours(2),  'heure_arrivee_estimee' => now()->subHours(0),  'places_disponibles' => 0,  'vehicule_id' => 1, 'chauffeur_id' => 1, 'statut' => 'complet'],
            ['origine' => 'Dakar',   'destination' => 'Kaolack',      'prix' => 3500, 'heure_depart' => now()->subHours(6),  'heure_arrivee_estimee' => now()->subHours(3),  'places_disponibles' => 5,  'vehicule_id' => 2, 'chauffeur_id' => 2, 'statut' => 'complet'],
            ['origine' => 'Dakar',   'destination' => 'Touba',        'prix' => 4000, 'heure_depart' => now()->subHours(10), 'heure_arrivee_estimee' => now()->subHours(6),  'places_disponibles' => 2,  'vehicule_id' => 4, 'chauffeur_id' => 4, 'statut' => 'complet'],
            ['origine' => 'Dakar',   'destination' => 'Saint-Louis',  'prix' => 5500, 'heure_depart' => now()->subHours(30), 'heure_arrivee_estimee' => now()->subHours(25), 'places_disponibles' => 0,  'vehicule_id' => 8, 'chauffeur_id' => 8, 'statut' => 'complet'],
            ['origine' => 'Kaolack', 'destination' => 'Dakar',        'prix' => 3500, 'heure_depart' => now()->subHours(48), 'heure_arrivee_estimee' => now()->subHours(45), 'places_disponibles' => 3,  'vehicule_id' => 6, 'chauffeur_id' => 6, 'statut' => 'complet'],
            ['origine' => 'Dakar',   'destination' => 'Ziguinchor',   'prix' => 9000, 'heure_depart' => now()->subHours(72), 'heure_arrivee_estimee' => now()->subHours(60), 'places_disponibles' => 1,  'vehicule_id' => 3, 'chauffeur_id' => 3, 'statut' => 'complet'],
        ];

        foreach ($voyages as $v) {
            DB::table('voyages')->insert(array_merge($v, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        // ── Réservations ───────────────────────────────────────
        $reservations = [
            [13, 2, 'Mamadou Sow',       '771001001', 2, 5000,  'TK-'.now()->format('Ymd').'-AA1', 'confirmee', now()->subHours(2)],
            [13, 2, 'Ndéye Diop',        '771002002', 1, 2500,  'TK-'.now()->format('Ymd').'-AA2', 'confirmee', now()->subHours(2)],
            [13, 3, 'Ibou Fall',         '771003003', 3, 7500,  'TK-'.now()->format('Ymd').'-AA3', 'confirmee', now()->subHours(3)],
            [14, 2, 'Serigne Diallo',    '772001001', 2, 7000,  'TK-'.now()->format('Ymd').'-BB1', 'confirmee', now()->subHours(6)],
            [14, 3, 'Aminata Cisse',     '772002002', 1, 3500,  'TK-'.now()->format('Ymd').'-BB2', 'confirmee', now()->subHours(6)],
            [14, 2, 'Boubacar Ly',       '772003003', 2, 7000,  'TK-'.now()->format('Ymd').'-BB3', 'confirmee', now()->subHours(7)],
            [15, 4, 'Marème Thiam',      '773001001', 3, 12000, 'TK-'.now()->format('Ymd').'-CC1', 'confirmee', now()->subHours(10)],
            [15, 2, 'Tidiane Ndiaye',    '773002002', 1, 4000,  'TK-'.now()->format('Ymd').'-CC2', 'confirmee', now()->subHours(10)],
            [16, 3, 'Adja Gueye',        '774001001', 2, 11000, 'TK-'.now()->format('Ymd').'-DD1', 'confirmee', now()->subHours(28)],
            [16, 4, 'Omar Badji',        '774002002', 3, 16500, 'TK-'.now()->format('Ymd').'-DD2', 'confirmee', now()->subHours(29)],
            [16, 2, 'Coumba Kane',       '774003003', 1, 5500,  'TK-'.now()->format('Ymd').'-DD3', 'confirmee', now()->subHours(30)],
            [17, 3, 'Cheikh Sall',       '775001001', 2, 7000,  'TK-'.now()->format('Ymd').'-EE1', 'confirmee', now()->subHours(48)],
            [17, 4, 'Binta Konaté',      '775002002', 1, 3500,  'TK-'.now()->format('Ymd').'-EE2', 'confirmee', now()->subHours(49)],
            [18, 2, 'Moustapha Wade',    '776001001', 4, 36000, 'TK-'.now()->format('Ymd').'-FF1', 'confirmee', now()->subHours(72)],
            [18, 3, 'Sokhna Diop',       '776002002', 2, 18000, 'TK-'.now()->format('Ymd').'-FF2', 'confirmee', now()->subHours(73)],
            [1,  2, 'Papa Gorgui',       '777001001', 2, 5000,  'TK-'.now()->format('Ymd').'-GG1', 'confirmee', now()],
            [1,  3, 'Yacine Sarr',       '777002002', 1, 2500,  'TK-'.now()->format('Ymd').'-GG2', 'confirmee', now()],
            [2,  4, 'Diouma Diallo',     '778001001', 2, 11000, 'TK-'.now()->format('Ymd').'-HH1', 'confirmee', now()],
            [3,  2, 'Khady Fall',        '778002002', 1, 3500,  'TK-'.now()->format('Ymd').'-HH2', 'confirmee', now()],
            [3,  3, 'Awa Ndiaye',        '778003003', 3, 10500, 'TK-'.now()->format('Ymd').'-HH3', 'confirmee', now()],
            [7,  4, 'Saliou Mbaye',      '779001001', 2, 8000,  'TK-'.now()->format('Ymd').'-II1', 'confirmee', now()],
            [1,  2, 'Test Annulé 1',     '780001001', 1, 2500,  'TK-'.now()->format('Ymd').'-JJ1', 'annulee',   now()->subHours(5)],
            [2,  3, 'Test Annulé 2',     '780002002', 2, 11000, 'TK-'.now()->format('Ymd').'-JJ2', 'annulee',   now()->subHours(24)],
        ];

        foreach ($reservations as $r) {
            DB::table('reservations')->insert([
                'voyage_id'          => $r[0],
                'user_id'            => $r[1],
                'passager_nom'       => $r[2],
                'passager_telephone' => $r[3],
                'nombre_places'      => $r[4],
                'montant_total'      => $r[5],
                'numero_ticket'      => $r[6],
                'statut'             => $r[7],
                'date_reservation'   => $r[8],
                'created_at'         => $r[8],
                'updated_at'         => $r[8],
            ]);
        }

        DB::statement('PRAGMA foreign_keys = ON');

        $this->command->info('✅ Base initialisée avec succès !');
        $this->command->info('👤 Admin   : admin@sunugare.sn / password');
        $this->command->info('👤 Vendeur : amadou@sunugare.sn / password');
    }
}