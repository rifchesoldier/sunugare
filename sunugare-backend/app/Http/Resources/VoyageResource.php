<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VoyageResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'                    => $this->id,
            'origine'               => $this->origine,
            'destination'           => $this->destination,
            'prix'                  => (float) $this->prix,
            'heure_depart'          => $this->heure_depart?->toIso8601String(),
            'heure_arrivee_estimee' => $this->heure_arrivee_estimee?->toIso8601String(),
            'places_totales'        => $this->places_totales,
            'places_disponibles'    => $this->places_disponibles,
            'taux_occupation'       => $this->taux_occupation,
            'statut'                => $this->statut,
            'vehicule'              => new VehiculeResource($this->whenLoaded('vehicule')),
            'chauffeur'             => new ChauffeurResource($this->whenLoaded('chauffeur')),
            'created_at'            => $this->created_at?->toIso8601String(),
        ];
    }
}
