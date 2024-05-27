<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageAttachments extends Model
{
    use HasFactory;
    protected $fillable = [
        'message_id',
        'name',
        'path',
        'mime',
        'size'
    ];
}
