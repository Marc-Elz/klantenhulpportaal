<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [LoginController::class, 'authenticate']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/tickets', TicketController::class);
});

// admin routes
// crud users, categories

// admin/relevant user routes
// crud tickets, tickets
