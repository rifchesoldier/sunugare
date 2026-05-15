<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('numero_ticket', 20)->unique();
            $table->foreignId('voyage_id')->constrained('voyages')->onDelete('restrict');
            $table->foreignId('user_id')->constrained('users')->onDelete('restrict');
            $table->string('passager_nom', 150);
            $table->string('passager_telephone', 20);
            $table->unsignedTinyInteger('nombre_places')->default(1);
            $table->decimal('montant_total', 10, 2);
            $table->enum('statut', ['confirmee', 'annulee', 'remboursee'])->default('confirmee');
            $table->timestamp('date_reservation')->useCurrent();
            $table->timestamps();
            $table->softDeletes();

            $table->index('voyage_id');
            $table->index('user_id');
            $table->index('statut');
            $table->index('date_reservation');
            $table->index('numero_ticket');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
