<?php

namespace App\Services;

use App\Models\Vehicule;
use App\Models\Voyage;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class VoyageService
{
    private const CACHE_TTL = 300; // 5 minutes

    public function getAll(array $filters = [])
    {
        $cacheKey = 'voyages_list_' . md5(serialize($filters));

        return Cache::tags(['voyages'])->remember('voyages_list_' . md5(serialize($filters)), 300, fn() => ...); {
            $query = Voyage::with(['vehicule', 'chauffeur'])
                ->when(isset($filters['origine']), fn($q) => $q->where('origine', 'like', '%' . $filters['origine'] . '%'))
                ->when(isset($filters['destination']), fn($q) => $q->where('destination', 'like', '%' . $filters['destination'] . '%'))
                ->when(isset($filters['statut']), fn($q) => $q->where('statut', $filters['statut']))
                ->when(isset($filters['date']), fn($q) => $q->whereDate('heure_depart', $filters['date']))
                ->orderBy('heure_depart');

            return $query->paginate(15);
        });
    }

    public function create(array $data): Voyage
    {
        return DB::transaction(function () use ($data) {
            $vehicule = Vehicule::findOrFail($data['vehicule_id']);

            $data['places_totales']     = $vehicule->capacite;
            $data['places_disponibles'] = $vehicule->capacite;

            $vehicule->update(['statut' => 'en_service']);

            $voyage = Voyage::create($data);

            Cache::tags(['voyages'])->flush();

            return $voyage->load(['vehicule', 'chauffeur']);
        });
    }

    public function update(Voyage $voyage, array $data): Voyage
    {
        return DB::transaction(function () use ($voyage, $data) {
            $voyage->update($data);
            Cache::tags(['voyages'])->flush();
            return $voyage->fresh(['vehicule', 'chauffeur']);
        });
    }

    public function delete(Voyage $voyage): void
    {
        DB::transaction(function () use ($voyage) {
            if ($voyage->reservations()->where('statut', 'confirmee')->exists()) {
                throw new \Exception('Impossible de supprimer un voyage avec des réservations confirmées.');
            }
            $voyage->vehicule?->update(['statut' => 'disponible']);
            $voyage->delete();
            Cache::tags(['voyages'])->flush();
        });
    }
}
