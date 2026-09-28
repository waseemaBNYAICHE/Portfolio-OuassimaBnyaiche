<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ProfileRequest;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    public function index(): JsonResponse { return response()->json(Profile::first()); }
    public function store(ProfileRequest $request): JsonResponse {
        $profile = Profile::updateOrCreate(['user_id' => $request->user()->id], $request->validated());
        return response()->json(['message' => 'Profil enregistré avec succès.', 'data' => $profile], 201);
    }
    public function update(ProfileRequest $request, Profile $profile): JsonResponse {
        $profile->update($request->validated());
        return response()->json(['message' => 'Profil modifié avec succès.', 'data' => $profile->fresh()]);
    }
    public function destroy(Profile $profile): JsonResponse { $profile->delete(); return response()->json(['message' => 'Profil supprimé.']); }
}
