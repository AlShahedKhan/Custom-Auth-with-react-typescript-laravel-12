<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class RegisterController extends Controller
{
     public function create()
    {
        return Inertia::render('Auth/Register');
    }
}
