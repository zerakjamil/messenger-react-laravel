<?php

use App\Http\Resources\UserResouce;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('online', function ($user) {
    return $user ? new UserResouce($user) : null;
});
