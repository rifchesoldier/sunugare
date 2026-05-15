<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chauffeur extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'nom',
        'prenom',
        'telephone',
        'numero_permis',
        'date_expiration_permis',
        'statut',
    ];

    protected $casts = [
        'date_expiration_permis' => 'date',
    ];

    public function voyages(): HasMany
    {
        return $this->hasMany(Voyage::class);
    }

    public function getNomCompletAttribute(): string
    {
        return "{$this->prenom} {$this->nom}";
    }

    public function scopeActif($query)
    {
        return $query->where('statut', 'actif');
    }
}
