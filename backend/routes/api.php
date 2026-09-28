<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\SocialLinkController;
use App\Http\Controllers\Api\TechnologyController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

// API publique consommée par le portfolio.
Route::get('/profile', [ProfileController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/technologies', [TechnologyController::class, 'index']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/educations', [EducationController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/social-links', [SocialLinkController::class, 'index']);
Route::post('/contact', [ContactMessageController::class, 'store'])->middleware('throttle:6,1');

// API d'administration protégée par un Bearer token Sanctum.
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('admin')->group(function () {
        Route::post('/profile', [ProfileController::class, 'store']);
        Route::put('/profile/{profile}', [ProfileController::class, 'update']);
        Route::delete('/profile/{profile}', [ProfileController::class, 'destroy']);
        Route::apiResources([
            'projects' => ProjectController::class,
            'categories' => CategoryController::class,
            'technologies' => TechnologyController::class,
            'skills' => SkillController::class,
            'experiences' => ExperienceController::class,
            'educations' => EducationController::class,
            'services' => ServiceController::class,
            'social-links' => SocialLinkController::class,
            'contact-messages' => ContactMessageController::class,
        ]);
    });
});
