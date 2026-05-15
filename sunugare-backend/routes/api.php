<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChauffeurController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\VehiculeController;
use App\Http\Controllers\Api\VoyageController;
use Illuminate\Support\Facades\Route;

// Auth publique
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// Routes protegees par Sanctum
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',      [AuthController::class, 'me']);

    // Voyages (lecture pour tous, ecriture admin/agent)
    Route::get('/voyages',        [VoyageController::class, 'index']);
    Route::get('/voyages/{voyage}',[VoyageController::class, 'show']);

    Route::middleware('role:admin,agent')->group(function () {
        Route::post('/voyages',             [VoyageController::class, 'store']);
        Route::put('/voyages/{voyage}',     [VoyageController::class, 'update']);
        Route::delete('/voyages/{voyage}',  [VoyageController::class, 'destroy']);
    });

    // Reservations
    Route::get('/reservations',                          [ReservationController::class, 'index']);
    Route::post('/reservations',                         [ReservationController::class, 'store']);
    Route::get('/reservations/{reservation}',            [ReservationController::class, 'show']);
    Route::patch('/reservations/{reservation}/annuler',  [ReservationController::class, 'annuler']);

    // Vehicules (admin seulement)
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('vehicules', VehiculeController::class);
        Route::apiResource('chauffeurs', ChauffeurController::class);
        Route::get('/dashboard', [DashboardController::class, 'index']);
    });
});
