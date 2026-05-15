<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\Services\ReservationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function __construct(private readonly ReservationService $reservationService) {}

    public function index(Request $request): JsonResponse
    {
        $reservations = Reservation::with(['voyage.vehicule', 'voyage.chauffeur'])
            ->when($request->user()->role === 'client', fn($q) => $q->where('user_id', $request->user()->id))
            ->orderByDesc('date_reservation')
            ->paginate(15);

        return response()->json([
            'data' => ReservationResource::collection($reservations->items()),
            'meta' => [
                'current_page' => $reservations->currentPage(),
                'last_page'    => $reservations->lastPage(),
                'total'        => $reservations->total(),
            ],
        ]);
    }

    public function store(StoreReservationRequest $request): JsonResponse
    {
        try {
            $reservation = $this->reservationService->create(
                $request->validated(),
                $request->user()->id
            );
            return response()->json(new ReservationResource($reservation), 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function show(Reservation $reservation): JsonResponse
    {
        $this->authorize('view', $reservation);
        $reservation->load(['voyage.vehicule', 'voyage.chauffeur']);
        return response()->json(new ReservationResource($reservation));
    }

    public function annuler(Reservation $reservation): JsonResponse
    {
        try {
            $updated = $this->reservationService->annuler($reservation);
            return response()->json(new ReservationResource($updated));
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }
}
