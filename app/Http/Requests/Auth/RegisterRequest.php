<?php

namespace App\Http\Requests\Auth;

use App\Models\Auth\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:25',
            'last_name' => ['required'|'string'|'max:25'],
            'email' => ['required'|'string'|'lowercase'|'email'|'max:30'|'unique:'.User::class],
            'password' => ['required'|'confirmed'|Password::defaults()]
        ];
    }
}
