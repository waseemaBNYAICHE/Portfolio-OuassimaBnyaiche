<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->validated('email'))->first();
        if (! $user || ! Hash::check($request->validated('password'), $user->password)) {
            return response()->json(['message' => 'Identifiants incorrects.'], 422);
        }
        $user->tokens()->delete();
        return response()->json(['message' => 'Connexion réussie.', 'user' => $user, 'token' => $user->createToken('portfoliohub-admin')->plainTextToken]);
    }

    public function me(Request $request): JsonResponse { return response()->json($request->user()); }
    public function logout(Request $request): JsonResponse {
        $request->user()->currentAccessToken()?->delete();
        return response()->json(['message' => 'Déconnexion réussie.']);
    }
}
