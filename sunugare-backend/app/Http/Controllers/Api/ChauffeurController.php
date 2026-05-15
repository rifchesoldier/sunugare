<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChauffeurRequest;
use App\Http\Resources\ChauffeurResource;
use App\Models\Chauffeur;
use Illuminate\Http\JsonResponse;

class ChauffeurController extends Controller
{
    public function index(): JsonResponse
    {
        $chauffeurs = Chauffeur::actif()->orderBy('nom')->paginate(20);
        return response()->json([
            'data' => ChauffeurResource::collection($chauffeurs->items()),
            'meta' => ['total' => $chauffeurs->total()],
        ]);
    }

    public function store(StoreChauffeurRequest $request): JsonResponse
    {
        try {
            $chauffeur = Chauffeur::create($request->validated());
            return response()->json(new ChauffeurResource($chauffeur), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function show(Chauffeur $chauffeur): JsonResponse
    {
        return response()->json(new ChauffeurResource($chauffeur));
    }

    public function update(StoreChauffeurRequest $request, Chauffeur $chauffeur): JsonResponse
    {
        try {
            $chauffeur->update($request->validated());
            return response()->json(new ChauffeurResource($chauffeur->fresh()));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function destroy(Chauffeur $chauffeur): JsonResponse
    {
        try {
            $chauffeur->update(['statut' => 'inactif']);
            return response()->json(['message' => 'Chauffeur desactive.']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
