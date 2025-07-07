<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Auth;

Broadcast::channel('chat.{id1}.{id2}', function ($user, $id1, $id2) {
    return $user->id == $id1 || $user->id == $id2;
});
