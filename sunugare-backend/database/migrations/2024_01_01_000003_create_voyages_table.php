<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('voyages', function (Blueprint $table) {
            $table->id();
            $table->string('origine', 150);
            $table->string('destination', 150);
            $table->decimal('prix', 10, 2);
            $table->dateTime('heure_depart');
            $table->dateTime('heure_arrivee_estimee')->nullable();
            $table->unsignedTinyInteger('places_totales');
            $table->unsignedTinyInteger('places_disponibles');
            $table->enum('statut', ['planifie', 'en_cours', 'termine', 'annule'])->default('planifie');
            $table->foreignId('vehicule_id')->constrained('vehicules')->onDelete('restrict');
            $table->foreignId('chauffeur_id')->constrained('chauffeurs')->onDelete('restrict');
            $table->timestamps();
            $table->softDeletes();

            $table->index('heure_depart');
            $table->index('statut');
            $table->index(['origine', 'destination']);
            $table->index('vehicule_id');
            $table->index('chauffeur_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('voyages');
    }
};

