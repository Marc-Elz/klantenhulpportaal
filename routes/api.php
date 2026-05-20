<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [LoginController::class, 'authenticate']);

// Route::middleware('auth:api')->get('/auth-check', function (Request $request) {
//     return response()->json(['authenticated' => Auth::check()]);
// });
