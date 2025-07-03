<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use App\Models\Auth\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Register', [
            'csrfToken' => csrf_token()
        ]);
    }

    public function store(RegisterRequest $request)
    {
        // Validate the request
        $validated = $request->validated();

        try {
            // Create the user
            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            // Fire the registered event
            event(new Registered($user));

            // Login the user
            Auth::login($user);

            // Handle different response types
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Registration successful',
                    'user' => $user,
                    'redirect' => route('dashboard')
                ], 201);
            }

            return redirect()->intended(route('dashboard', absolute: false));

        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Registration failed: ' . $e->getMessage());

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Registration failed. Please try again.',
                    'error' => $e->getMessage()
                ], 500);
            }

            return back()->withErrors(['general' => 'Registration failed. Please try again.']);
        }
    }
}
