<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChauffeurResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'                      => $this->id,
            'nom'                     => $this->nom,
            'prenom'                  => $this->prenom,
            'nom_complet'             => $this->nom_complet,
            'telephone'               => $this->telephone,
            'numero_permis'           => $this->numero_permis,
            'date_expiration_permis'  => $this->date_expiration_permis?->toDateString(),
            'statut'                  => $this->statut,
        ];
    }
}
