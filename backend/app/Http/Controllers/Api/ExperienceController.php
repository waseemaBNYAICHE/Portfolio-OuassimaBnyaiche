<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index(Request $request): JsonResponse { $q = Experience::orderBy('display_order')->orderByDesc('start_date'); if (! $request->user('sanctum')) $q->where('active', true); return response()->json($q->get()); }
    public function store(ExperienceRequest $request): JsonResponse { return response()->json(['message' => 'Expérience créée.', 'data' => Experience::create($request->validated())], 201); }
    public function show(Experience $experience): JsonResponse { return response()->json($experience); }
    public function update(ExperienceRequest $request, Experience $experience): JsonResponse { $experience->update($request->validated()); return response()->json(['message' => 'Expérience modifiée.', 'data' => $experience->fresh()]); }
    public function destroy(Experience $experience): JsonResponse { $experience->delete(); return response()->json(['message' => 'Expérience supprimée.']); }
}
