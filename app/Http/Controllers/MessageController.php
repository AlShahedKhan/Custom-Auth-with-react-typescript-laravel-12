<?php


namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function index(Request $request)
    {
        $user = Auth::user();
        $receiverId = $request->input('receiver_id');

        if ($receiverId) {
            return Message::where(function ($query) use ($user, $receiverId) {
                $query->where('sender_id', $user->id)
                      ->where('receiver_id', $receiverId);
            })->orWhere(function ($query) use ($user, $receiverId) {
                $query->where('sender_id', $receiverId)
                      ->where('receiver_id', $user->id);
            })->with(['sender', 'receiver'])->orderBy('created_at', 'asc')->get();
        } else {
            // This case might not be needed if we always have a receiver_id for direct messages
            return Message::with(['sender', 'receiver'])->get();
        }
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $message = Message::create([
            'sender_id' => $user->id,
            'receiver_id' => $request->input('receiver_id'),
            'message' => $request->input('message'),
        ]);

        broadcast(new MessageSent($user, $message))->toOthers();

        return response()->json(['message' => $message->load('sender', 'receiver')]);
    }

    public function users()
    {
        return User::where('id', '!=', Auth::id())->get();
    }
}
