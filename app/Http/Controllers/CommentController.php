<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Ticket;
use App\Models\User;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Resources\CommentResource;
use App\Notifications\AdminComment;

class CommentController extends Controller
{
    public function index(Request $request, Ticket $ticket)
    {
        $comments = $ticket->comments()->get();

        return CommentResource::collection($comments);
    }

    public function store(StoreCommentRequest $request, Ticket $ticket)
    {
        $user = $request->user();
        $validatedData = $request->validated();
        $validatedData['user_id'] = $user->id;

        Comment::create($validatedData);

        $this->updateTicketSubmitter($ticket);

        $comments = $ticket->comments()->get();

        return CommentResource::collection($comments);
    }

    public function update(StoreCommentRequest $request, Ticket $ticket, Comment $comment)
    {
        $validatedData = $request->validated();
        $comment->update($validatedData);

        $comments = $ticket->comments()->get();

        return CommentResource::collection($comments);
    }

    private function updateTicketSubmitter(Ticket $ticket){
        $user = User::find($ticket['user_submitter_id']);
        $user->notify(new AdminComment($user));
    }
}
