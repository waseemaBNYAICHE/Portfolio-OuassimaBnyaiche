<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request): JsonResponse { $q = Service::orderBy('display_order'); if (! $request->user('sanctum')) $q->where('active', true); return response()->json($q->get()); }
    public function store(ServiceRequest $request): JsonResponse { return response()->json(['message' => 'Service créé.', 'data' => Service::create($request->validated())], 201); }
    public function show(Service $service): JsonResponse { return response()->json($service); }
    public function update(ServiceRequest $request, Service $service): JsonResponse { $service->update($request->validated()); return response()->json(['message' => 'Service modifié.', 'data' => $service->fresh()]); }
    public function destroy(Service $service): JsonResponse { $service->delete(); return response()->json(['message' => 'Service supprimé.']); }
}
