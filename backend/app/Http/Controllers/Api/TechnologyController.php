<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\TechnologyRequest;
use App\Models\Technology;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TechnologyController extends Controller
{
    public function index(Request $request): JsonResponse { $q = Technology::orderBy('name'); if (! $request->user('sanctum')) $q->where('active', true); return response()->json($q->get()); }
    public function store(TechnologyRequest $request): JsonResponse { return response()->json(['message' => 'Technologie créée.', 'data' => Technology::create($request->validated())], 201); }
    public function show(Technology $technology): JsonResponse { return response()->json($technology); }
    public function update(TechnologyRequest $request, Technology $technology): JsonResponse { $technology->update($request->validated()); return response()->json(['message' => 'Technologie modifiée.', 'data' => $technology->fresh()]); }
    public function destroy(Technology $technology): JsonResponse { $technology->delete(); return response()->json(['message' => 'Technologie supprimée.']); }
}
