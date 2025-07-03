<?php

use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Auth\UserController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('/post', PostController::class);

Route::get('/dashboard', [RegisterController::class, 'create'])
    ->middleware('auth')
    ->name('dashboard');

Route::get('/register', [RegisterController::class, 'create'])
    ->middleware('guest')
    ->name('register');

Route::post('/register',[RegisterController::class, 'store'])
    ->middleware('guest')
    ->name('register.store');
