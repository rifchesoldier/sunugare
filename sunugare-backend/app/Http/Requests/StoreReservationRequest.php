<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'voyage_id'          => 'required|exists:voyages,id',
            'passager_nom'       => 'required|string|max:150',
            'passager_telephone' => 'required|string|max:20',
            'nombre_places'      => 'required|integer|min:1|max:10',
        ];
    }
}
