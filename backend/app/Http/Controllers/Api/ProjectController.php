<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Project::with(['category', 'technologyItems'])->orderBy('display_order')->latest();
        if (! $request->user('sanctum')) $query->where('status', 'published');
        if ($request->filled('search')) $query->where(fn ($q) => $q->where('title', 'ilike', '%'.$request->search.'%')->orWhere('description', 'ilike', '%'.$request->search.'%'));
        if ($request->boolean('featured')) $query->where('featured', true);
        return response()->json($query->get());
    }
    public function store(ProjectRequest $request): JsonResponse
    {
        $data = $request->validated(); $technologyIds = Arr::pull($data, 'technology_ids', []);
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        if (($data['status'] ?? null) === 'published' && empty($data['published_at'])) $data['published_at'] = now();
        $project = Project::create($data); $project->technologyItems()->sync($technologyIds);
        return response()->json(['message' => 'Projet créé avec succès.', 'data' => $project->load(['category', 'technologyItems'])], 201);
    }
    public function show(Request $request, Project $project): JsonResponse {
        if (! $request->user('sanctum') && $project->status !== 'published') abort(404);
        return response()->json($project->load(['category', 'technologyItems']));
    }
    public function update(ProjectRequest $request, Project $project): JsonResponse
    {
        $data = $request->validated(); $technologyIds = Arr::pull($data, 'technology_ids', null);
        $data['slug'] = $data['slug'] ?? Str::slug($data['title']);
        if (($data['status'] ?? null) === 'published' && ! $project->published_at) $data['published_at'] = now();
        $project->update($data); if ($technologyIds !== null) $project->technologyItems()->sync($technologyIds);
        return response()->json(['message' => 'Projet modifié avec succès.', 'data' => $project->fresh()->load(['category', 'technologyItems'])]);
    }
    public function destroy(Project $project): JsonResponse { $project->delete(); return response()->json(['message' => 'Projet supprimé avec succès.']); }
}
