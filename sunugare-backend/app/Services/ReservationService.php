<?php

namespace App\Services;

use App\Models\Reservation;
use App\Models\Voyage;
use Illuminate\Support\Facades\DB;

class ReservationService
{
    public function create(array $data, int $userId): Reservation
    {
        return DB::transaction(function () use ($data, $userId) {
            // Lock optimiste pour éviter la surréservation
            $voyage = Voyage::lockForUpdate()->findOrFail($data['voyage_id']);

            if ($voyage->statut !== 'planifie') {
                throw new \Exception('Ce voyage n\'est plus disponible à la réservation.');
            }

            if ($voyage->places_disponibles < $data['nombre_places']) {
                throw new \Exception(
                    "Places insuffisantes. Disponibles : {$voyage->places_disponibles}"
                );
            }

            $montantTotal = $voyage->prix * $data['nombre_places'];

            $reservation = Reservation::create([
                'voyage_id'          => $voyage->id,
                'user_id'            => $userId,
                'passager_nom'       => $data['passager_nom'],
                'passager_telephone' => $data['passager_telephone'],
                'nombre_places'      => $data['nombre_places'],
                'montant_total'      => $montantTotal,
                'statut'             => 'confirmee',
            ]);

            // Mise à jour atomique des places
            $voyage->decrement('places_disponibles', $data['nombre_places']);

            return $reservation->load('voyage.vehicule');
        });
    }

    public function annuler(Reservation $reservation): Reservation
    {
        return DB::transaction(function () use ($reservation) {
            if ($reservation->statut !== 'confirmee') {
                throw new \Exception('Seules les réservations confirmées peuvent être annulées.');
            }

            $reservation->update(['statut' => 'annulee']);

            // Restitution des places
            $reservation->voyage->increment('places_disponibles', $reservation->nombre_places);

            return $reservation->fresh('voyage');
        });
    }
}
