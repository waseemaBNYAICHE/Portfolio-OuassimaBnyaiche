<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request): JsonResponse { $q = Category::orderBy('display_order'); if (! $request->user('sanctum')) $q->where('active', true); return response()->json($q->get()); }
    public function store(CategoryRequest $request): JsonResponse { return response()->json(['message' => 'Catégorie créée.', 'data' => Category::create($request->validated())], 201); }
    public function show(Category $category): JsonResponse { return response()->json($category); }
    public function update(CategoryRequest $request, Category $category): JsonResponse { $category->update($request->validated()); return response()->json(['message' => 'Catégorie modifiée.', 'data' => $category->fresh()]); }
    public function destroy(Category $category): JsonResponse { $category->delete(); return response()->json(['message' => 'Catégorie supprimée.']); }
}
