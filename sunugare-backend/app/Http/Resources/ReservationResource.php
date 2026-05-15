<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'                  => $this->id,
            'numero_ticket'       => $this->numero_ticket,
            'passager_nom'        => $this->passager_nom,
            'passager_telephone'  => $this->passager_telephone,
            'nombre_places'       => $this->nombre_places,
            'montant_total'       => (float) $this->montant_total,
            'statut'              => $this->statut,
            'date_reservation'    => $this->date_reservation?->toIso8601String(),
            'voyage'              => new VoyageResource($this->whenLoaded('voyage')),
        ];
    }
}
