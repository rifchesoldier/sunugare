<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVoyageRequest;
use App\Http\Resources\VoyageResource;
use App\Models\Voyage;
use App\Services\VoyageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VoyageController extends Controller
{
    public function __construct(private readonly VoyageService $voyageService) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $voyages = $this->voyageService->getAll($request->only([
                'origine', 'destination', 'statut', 'date'
            ]));

            return response()->json([
                'data' => VoyageResource::collection($voyages->items()),
                'meta' => [
                    'current_page' => $voyages->currentPage(),
                    'last_page'    => $voyages->lastPage(),
                    'total'        => $voyages->total(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function store(StoreVoyageRequest $request): JsonResponse
    {
        try {
            $voyage = $this->voyageService->create($request->validated());
            return response()->json(new VoyageResource($voyage), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function show(Voyage $voyage): JsonResponse
    {
        $voyage->load(['vehicule', 'chauffeur', 'reservations']);
        return response()->json(new VoyageResource($voyage));
    }

    public function update(StoreVoyageRequest $request, Voyage $voyage): JsonResponse
    {
        try {
            $updated = $this->voyageService->update($voyage, $request->validated());
            return response()->json(new VoyageResource($updated));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function destroy(Voyage $voyage): JsonResponse
    {
        try {
            $this->voyageService->delete($voyage);
            return response()->json(['message' => 'Voyage supprime avec succes.']);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
}
