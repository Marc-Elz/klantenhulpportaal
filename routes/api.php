<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/tickets', TicketController::class);
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::put('/tickets/{ticket}', [TicketController::class, 'update']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/users', [UserController::class, 'index']);

});

// admin routes
// crud users, categories

// admin/relevant user routes
// crud tickets, tickets
