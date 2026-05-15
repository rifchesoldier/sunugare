<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Reservation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'numero_ticket',
        'voyage_id',
        'user_id',
        'passager_nom',
        'passager_telephone',
        'nombre_places',
        'montant_total',
        'statut',
        'date_reservation',
    ];

    protected $casts = [
        'montant_total'    => 'decimal:2',
        'nombre_places'    => 'integer',
        'date_reservation' => 'datetime',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function ($reservation) {
            $reservation->numero_ticket = 'SG-' . strtoupper(Str::random(8));
        });
    }

    public function voyage(): BelongsTo
    {
        return $this->belongsTo(Voyage::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
