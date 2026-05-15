<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreChauffeurRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        $id = $this->route('chauffeur');
        return [
            'nom'                    => 'required|string|max:100',
            'prenom'                 => 'required|string|max:100',
            'telephone'              => 'required|string|max:20|unique:chauffeurs,telephone,' . $id,
            'numero_permis'          => 'required|string|max:50|unique:chauffeurs,numero_permis,' . $id,
            'date_expiration_permis' => 'required|date|after:today',
            'statut'                 => 'sometimes|in:actif,inactif,suspendu',
        ];
    }
}
