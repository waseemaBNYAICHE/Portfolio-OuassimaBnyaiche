<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\SkillRequest;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index(Request $request): JsonResponse { $q = Skill::orderBy('display_order'); if (! $request->user('sanctum')) $q->where('active', true); return response()->json($q->get()); }
    public function store(SkillRequest $request): JsonResponse { return response()->json(['message' => 'Compétence créée.', 'data' => Skill::create($request->validated())], 201); }
    public function show(Skill $skill): JsonResponse { return response()->json($skill); }
    public function update(SkillRequest $request, Skill $skill): JsonResponse { $skill->update($request->validated()); return response()->json(['message' => 'Compétence modifiée.', 'data' => $skill->fresh()]); }
    public function destroy(Skill $skill): JsonResponse { $skill->delete(); return response()->json(['message' => 'Compétence supprimée.']); }
}
