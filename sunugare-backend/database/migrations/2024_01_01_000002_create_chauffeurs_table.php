<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('chauffeurs', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('telephone', 20)->unique();
            $table->string('numero_permis', 50)->unique();
            $table->date('date_expiration_permis');
            $table->enum('statut', ['actif', 'inactif', 'suspendu'])->default('actif');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['nom', 'prenom']);
            $table->index('statut');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chauffeurs');
    }
};
