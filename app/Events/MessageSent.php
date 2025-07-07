<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\Models\Message;
use App\Models\Auth\User;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public $user;

    public $message;

    public function __construct(User $user, Message $message)
    {
        $this->user = $user;
        $this->message = $message;
    }

    public function broadcastOn(): array
    {
        $ids = [$this->message->sender_id, $this->message->receiver_id];
        sort($ids);
        return [
            new PrivateChannel('chat.' . implode('.', $ids)),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'message' => $this->message->load('sender', 'receiver'),
        ];
    }
}
