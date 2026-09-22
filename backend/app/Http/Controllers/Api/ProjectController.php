<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;



class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse 
    {
         $projects = Project::query()
          ->orderBy('display_order') 
          ->latest() 
          ->get();
         return response()->json($projects);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
{
    $validated = $request->validate([
        'title' => ['required', 'string', 'max:255'],
        'slug' => ['nullable', 'string', 'max:255', 'unique:projects,slug'],
        'short_description' => ['nullable', 'string', 'max:255'],
        'description' => ['required', 'string'],
        'technologies' => ['nullable', 'array'],
        'technologies.*' => ['string', 'max:100'],
        'image' => ['nullable', 'string', 'max:255'],
        'github_url' => ['nullable', 'url', 'max:255'],
        'demo_url' => ['nullable', 'url', 'max:255'],
        'status' => ['nullable', 'in:draft,published,archived'],
        'featured' => ['nullable', 'boolean'],
        'display_order' => ['nullable', 'integer', 'min:0'],
    ]);

    $validated['slug'] = $validated['slug']
        ?? Str::slug($validated['title']);

    if (($validated['status'] ?? 'draft') === 'published') {
        $validated['published_at'] = now();
    }

    $project = Project::create($validated);

    return response()->json([
        'message' => 'Projet créé avec succès.',
        'data' => $project,
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
