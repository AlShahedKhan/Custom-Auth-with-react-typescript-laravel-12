<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getFullNameAttribute()
    {
        $data = $this->first_name . ' ' . $this->last_name;
        return trim($data);
        // Alternatively, you can use the following line if you prefer:
        // return "{$this->first_name} {$this->last_name}";
    }
}
