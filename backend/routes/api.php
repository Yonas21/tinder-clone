<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PersonController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // People endpoints
    Route::get('/people', [PersonController::class, 'index']);
    Route::post('/people/{id}/like', [PersonController::class, 'like']);
    Route::post('/people/{id}/dislike', [PersonController::class, 'dislike']);
    Route::get('/people/liked', [PersonController::class, 'liked']);
});

