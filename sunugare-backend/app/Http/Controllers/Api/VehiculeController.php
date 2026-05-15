<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehiculeRequest;
use App\Http\Resources\VehiculeResource;
use App\Models\Vehicule;
use Illuminate\Http\JsonResponse;

class VehiculeController extends Controller
{
    public function index(): JsonResponse
    {
        $vehicules = Vehicule::orderBy('immatriculation')->paginate(20);
        return response()->json([
            'data' => VehiculeResource::collection($vehicules->items()),
            'meta' => ['total' => $vehicules->total()],
        ]);
    }

    public function store(StoreVehiculeRequest $request): JsonResponse
    {
        try {
            $vehicule = Vehicule::create($request->validated());
            return response()->json(new VehiculeResource($vehicule), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(Vehicule $vehicule): JsonResponse
    {
        return response()->json(new VehiculeResource($vehicule));
    }

    public function update(StoreVehiculeRequest $request, Vehicule $vehicule): JsonResponse
    {
        try {
            $vehicule->update($request->validated());
            return response()->json(new VehiculeResource($vehicule->fresh()));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Vehicule $vehicule): JsonResponse
    {
        try {
            if ($vehicule->voyages()->where('statut', 'planifie')->exists()) {
                return response()->json(['message' => 'Vehicule affecte a des voyages planifies.'], 422);
            }
            $vehicule->delete();
            return response()->json(['message' => 'Vehicule supprime.']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
