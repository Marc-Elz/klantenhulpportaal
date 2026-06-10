<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\NoteController;
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
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
    Route::get('/tickets/{ticket}/comments/', [CommentController::class, 'index']);
    Route::post('/tickets/{ticket}/comments/', [CommentController::class, 'store']);
    Route::put('/tickets/{ticket}/comments/{comment}', [CommentController::class, 'update']);
    Route::get('/tickets/{ticket}/notes/', [NoteController::class, 'index']);
    Route::post('/tickets/{ticket}/notes/', [NoteController::class, 'store']);
    Route::put('/tickets/{ticket}/notes/{note}', [NoteController::class, 'update']);
    Route::delete('/tickets/{ticket}/notes/{note}', [NoteController::class, 'destroy']);
    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});
