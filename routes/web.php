<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Auth\UserController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('/post', PostController::class);
Route::get('/register', [UserController::class, 'register'])
    ->name('register');
