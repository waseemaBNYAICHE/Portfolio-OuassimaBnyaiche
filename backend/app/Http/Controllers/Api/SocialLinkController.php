<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\SocialLinkRequest;
use App\Models\SocialLink;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SocialLinkController extends Controller
{
    public function index(Request $request): JsonResponse { $q = SocialLink::orderBy('display_order'); if (! $request->user('sanctum')) $q->where('active', true); return response()->json($q->get()); }
    public function store(SocialLinkRequest $request): JsonResponse { return response()->json(['message' => 'Lien créé.', 'data' => SocialLink::create($request->validated())], 201); }
    public function show(SocialLink $socialLink): JsonResponse { return response()->json($socialLink); }
    public function update(SocialLinkRequest $request, SocialLink $socialLink): JsonResponse { $socialLink->update($request->validated()); return response()->json(['message' => 'Lien modifié.', 'data' => $socialLink->fresh()]); }
    public function destroy(SocialLink $socialLink): JsonResponse { $socialLink->delete(); return response()->json(['message' => 'Lien supprimé.']); }
}
