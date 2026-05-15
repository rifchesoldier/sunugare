<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VehiculeResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'              => $this->id,
            'immatriculation' => $this->immatriculation,
            'marque'          => $this->marque,
            'modele'          => $this->modele,
            'capacite'        => $this->capacite,
            'statut'          => $this->statut,
        ];
    }
}
