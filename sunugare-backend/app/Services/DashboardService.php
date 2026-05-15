<?php

namespace App\Services;

use App\Models\Reservation;
use App\Models\Voyage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function getStats(): array
    {
        return Cache::remember('dashboard_stats', 120, function () {
            $today = now()->toDateString();
            $month = now()->format('Y-m');

            $ventesJour = Reservation::query()
                ->where('statut', 'confirmee')
                ->whereDate('date_reservation', $today)
                ->selectRaw('COUNT(*) as nombre, SUM(montant_total) as total, SUM(nombre_places) as places')
                ->first();

            $ventesMois = Reservation::query()
                ->where('statut', 'confirmee')
                ->whereYear('date_reservation', now()->year)
                ->whereMonth('date_reservation', now()->month)
                ->selectRaw('COUNT(*) as nombre, SUM(montant_total) as total, SUM(nombre_places) as places')
                ->first();

            $tauxOccupation = Voyage::query()
                ->where('statut', '!=', 'annule')
                ->selectRaw('
                    AVG(
                        ((places_totales - places_disponibles) / NULLIF(places_totales, 0)) * 100
                    ) as taux_moyen
                ')
                ->value('taux_moyen');

            $topDestinations = Reservation::query()
                ->join('voyages', 'reservations.voyage_id', '=', 'voyages.id')
                ->where('reservations.statut', 'confirmee')
                ->whereDate('reservations.date_reservation', '>=', now()->subDays(30))
                ->groupBy('voyages.destination')
                ->orderByDesc('total_billets')
                ->limit(5)
                ->selectRaw('voyages.destination, SUM(reservations.nombre_places) as total_billets, SUM(reservations.montant_total) as revenu')
                ->get();

            $evolutionMensuelle = Reservation::query()
                ->where('statut', 'confirmee')
                ->whereYear('date_reservation', now()->year)
                ->groupByRaw('MONTH(date_reservation)')
                ->orderByRaw('MONTH(date_reservation)')
                ->selectRaw('MONTH(date_reservation) as mois, SUM(montant_total) as total, COUNT(*) as nombre')
                ->get();

            return [
                'ventes_jour'          => $ventesJour,
                'ventes_mois'          => $ventesMois,
                'taux_occupation_moyen'=> round((float)$tauxOccupation, 2),
                'top_destinations'     => $topDestinations,
                'evolution_mensuelle'  => $evolutionMensuelle,
                'voyages_actifs'       => Voyage::where('statut', 'planifie')->count(),
            ];
        });
    }
}
