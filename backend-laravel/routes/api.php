<?php

use App\Http\Controllers\Api\BukuController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\PeminjamanController;
use App\Http\Controllers\Api\PengembalianController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::controller(BukuController::class)->group(function () {
    Route::get('/buku', 'index');
    Route::post('/buku', 'store');
});

Route::controller(CustomerController::class)->group(function () {
    Route::get('/customer', 'index');
    Route::post('/customer', 'store');
});

Route::controller(PeminjamanController::class)->group(function () {
    Route::get('/peminjaman', 'index');
    Route::post('/peminjaman', 'peminjaman');
});

Route::controller(PengembalianController::class)->group(function () {
    Route::get('/pengembalian', 'index');
    Route::put('/pengembalian/{id}', 'pengembalian');
});
