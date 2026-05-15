<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehiculeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        $id = $this->route('vehicule');
        return [
            'immatriculation' => 'required|string|max:20|unique:vehicules,immatriculation,' . $id,
            'marque'          => 'required|string|max:100',
            'modele'          => 'required|string|max:100',
            'capacite'        => 'required|integer|min:5|max:70',
            'statut'          => 'sometimes|in:disponible,en_service,en_maintenance',
        ];
    }
}
