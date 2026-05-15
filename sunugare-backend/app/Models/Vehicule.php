<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicule extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'immatriculation',
        'marque',
        'modele',
        'capacite',
        'statut',
    ];

    protected $casts = [
        'capacite' => 'integer',
    ];

    public function voyages(): HasMany
    {
        return $this->hasMany(Voyage::class);
    }

    public function scopeDisponible($query)
    {
        return $query->where('statut', 'disponible');
    }
}
