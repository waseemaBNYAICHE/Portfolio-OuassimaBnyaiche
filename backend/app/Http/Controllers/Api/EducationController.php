<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\EducationRequest;
use App\Models\Education;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index(Request $request): JsonResponse { $q = Education::orderBy('display_order')->orderByDesc('start_date'); if (! $request->user('sanctum')) $q->where('active', true); return response()->json($q->get()); }
    public function store(EducationRequest $request): JsonResponse { return response()->json(['message' => 'Formation créée.', 'data' => Education::create($request->validated())], 201); }
    public function show(Education $education): JsonResponse { return response()->json($education); }
    public function update(EducationRequest $request, Education $education): JsonResponse { $education->update($request->validated()); return response()->json(['message' => 'Formation modifiée.', 'data' => $education->fresh()]); }
    public function destroy(Education $education): JsonResponse { $education->delete(); return response()->json(['message' => 'Formation supprimée.']); }
}
