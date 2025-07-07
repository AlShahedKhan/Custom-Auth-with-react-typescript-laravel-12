<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\MessageController;
use Inertia\Inertia;

Route::get('/messenger', function () {
    return Inertia::render('Messenger', [
        'currentUserId' => auth()->id(),
    ]);
})->middleware('auth');

Route::get('/messages', [MessageController::class, 'index'])->middleware('auth');
Route::post('/messages', [MessageController::class, 'store'])->middleware('auth');
Route::get('/users', [MessageController::class, 'users'])->middleware('auth');

Route::get('/', function () {
    return view('welcome');
});

Route::resource('/post', PostController::class)->middleware('auth');

Route::get('/dashboard', [RegisterController::class, 'dashboard'])
    ->middleware('auth')
    ->name('dashboard');

Route::get('/register', [RegisterController::class, 'create'])
    ->middleware('guest')
    ->name('register');

Route::post('/register',[RegisterController::class, 'store'])
    ->middleware('guest')
    ->name('register.store');

Route::get('/login', [LoginController::class, 'create'])
    ->middleware('guest')
    ->name('login');

Route::post('/login', [LoginController::class, 'store'])
    ->middleware('guest')
    ->name('login.store');

Route::post('/logout', [LoginController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');
