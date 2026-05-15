<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVoyageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin() || $this->user()->isAgent();
    }

    public function rules(): array
    {
        return [
            'origine'               => 'required|string|max:150',
            'destination'           => 'required|string|max:150|different:origine',
            'prix'                  => 'required|numeric|min:0',
            'heure_depart'          => 'required|date|after:now',
            'heure_arrivee_estimee' => 'nullable|date|after:heure_depart',
            'vehicule_id'           => 'required|exists:vehicules,id',
            'chauffeur_id'          => 'required|exists:chauffeurs,id',
        ];
    }

    public function messages(): array
    {
        return [
            'destination.different'        => 'La destination doit être différente de l\'origine.',
            'heure_depart.after'           => 'L\'heure de départ doit être dans le futur.',
            'heure_arrivee_estimee.after'  => 'L\'heure d\'arrivée doit être après le départ.',
        ];
    }
}
