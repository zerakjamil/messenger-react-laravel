<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'email_verified_at',
        'is_admin'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_user');
    }

    public static function getUsersExceptUser(User $exceptUser)
    {
        $userId = $exceptUser;
        $query = User::select(['users.*', 'messages.message as last_message', 'messages.created_at as last_message_date'])
        ->where('users.id', '!=', $userId)
        ->when(!$exceptUser->is_admin,function ($query){
            $query->whereNull('users.blocked_at');
        })
        ->leftJoin('conversations', function ($join) use ($userId){
            $join->on('conversations.user_id1','=','user.id')
                ->where('conversations.user_id2', '=', $userId)
            ->orWhere(function ($query) use ($userId){
                $query->on('conversations.user_id2', '=', 'user.id')
                ->where('conversations.user_id1', '=', $userId);
            });
        })
            ->leftJoin('messages','messages.id','=','conversations.last_messages_id')
        ;

    }
}
