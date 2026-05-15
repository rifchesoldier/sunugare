<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Voyage extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'origine',
        'destination',
        'prix',
        'heure_depart',
        'heure_arrivee_estimee',
        'places_totales',
        'places_disponibles',
        'statut',
        'vehicule_id',
        'chauffeur_id',
    ];

    protected $casts = [
        'prix'                  => 'decimal:2',
        'heure_depart'          => 'datetime',
        'heure_arrivee_estimee' => 'datetime',
        'places_totales'        => 'integer',
        'places_disponibles'    => 'integer',
    ];

    public function vehicule(): BelongsTo
    {
        return $this->belongsTo(Vehicule::class);
    }

    public function chauffeur(): BelongsTo
    {
        return $this->belongsTo(Chauffeur::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function getTauxOccupationAttribute(): float
    {
        if ($this->places_totales === 0) return 0;
        return round(
            (($this->places_totales - $this->places_disponibles) / $this->places_totales) * 100,
            2
        );
    }

    public function scopePlanifie($query)
    {
        return $query->where('statut', 'planifie');
    }

    public function scopeAvecPlaces($query)
    {
        return $query->where('places_disponibles', '>', 0);
    }
}
