<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Ticket;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Resources\CommentResource;

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

        $comments = $ticket->comments()->get();

        return CommentResource::collection($comments);
    }

    public function update(StoreCommentRequest $request, Comment $comment, Ticket $ticket)
    {
        $validatedData = $request->validated();
        $comment->update($validatedData);

        $comments = $ticket->comments()->get();

        return CommentResource::collection($comments);
    }
}
