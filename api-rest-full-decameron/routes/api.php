<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
use App\Http\Controllers\HabitacionesController;
use App\Http\Controllers\HotelController;

Route::apiResource('hoteles', HotelController::class);
Route::apiResource('habitaciones', HabitacionesController::class);

