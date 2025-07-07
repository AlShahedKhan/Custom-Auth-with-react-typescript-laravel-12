<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Auth\User;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'sender_id',
        'receiver_id',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\Auth\User::class, 'sender_id');
    }

    public function sender()
    {
        return $this->belongsTo(\App\Models\Auth\User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(\App\Models\Auth\User::class, 'receiver_id');
    }
}
