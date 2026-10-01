<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ContactMessageRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index(): JsonResponse { return response()->json(ContactMessage::latest()->get()); }
    public function store(ContactMessageRequest $request): JsonResponse { ContactMessage::create($request->validated()); return response()->json(['message' => 'Votre message a été envoyé avec succès.'], 201); }
    public function show(ContactMessage $contactMessage): JsonResponse { if ($contactMessage->status === 'new') $contactMessage->update(['status' => 'read', 'read_at' => now()]); return response()->json($contactMessage->fresh()); }
    public function update(Request $request, ContactMessage $contactMessage): JsonResponse { $data = $request->validate(['status' => ['required', 'in:new,read,archived']]); $data['read_at'] = $data['status'] === 'read' ? now() : $contactMessage->read_at; $contactMessage->update($data); return response()->json(['message' => 'Statut modifié.', 'data' => $contactMessage->fresh()]); }
    public function destroy(ContactMessage $contactMessage): JsonResponse { $contactMessage->delete(); return response()->json(['message' => 'Message supprimé.']); }
}
