<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use App\Models\Ticket;
use App\Models\User;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\DestroyNoteRequest;
use App\Http\Resources\NoteResource;



class NoteController extends Controller
{
    public function index(Request $request, Ticket $ticket)
    {
        $notes = $ticket->notes()->get();

        return NoteResource::collection($notes);
    }

    public function store(StoreNoteRequest $request, Ticket $ticket)
    {
        $user = $request->user();
        $validatedData = $request->validated();
        $validatedData['user_id'] = $user->id;

        Note::create($validatedData);

        $notes = $ticket->notes()->get();

        return NoteResource::collection($notes);
    }

    public function update(StoreNoteRequest $request, Ticket $ticket, Note $note)
    {
        $validatedData = $request->validated();
        $note->update($validatedData);

        $notes = $ticket->notes()->get();

        return NoteResource::collection($notes);
    }

    public function destroy(DestroyNoteRequest $request, Ticket $ticket, Note $note)
    {
        $note->delete();
        return response()->json(['message' => 'Note succesvol verwijderd']);
    }


}
