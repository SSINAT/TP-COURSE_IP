<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UploadController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/upload', function () {
    return view('Upload');
})->name('upload');
Route::post('/upload', [UploadController::class, 'upload'])->name('upload.post');