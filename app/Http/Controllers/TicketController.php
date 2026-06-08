<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\User;
use App\Http\Resources\TicketResource;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;


class TicketController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $tickets = $this->getAuthorizedTickets($user);

        return TicketResource::collection($tickets);
    }

    public function store(StoreTicketRequest $request)
    {

        // ignore any user_submitter_id from frontend to prevent users from submitting tickets in the name of other users
        $user = $request->user();

        $validatedData = $request->validated();
        $validatedData['user_submitter_id'] = $user->id;
        $validatedData['status'] = "open";

        Ticket::create($validatedData)->categories()->attach($validatedData['category_ids']);

        $tickets = $this->getAuthorizedTickets($user);
        return TicketResource::collection($tickets);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $user = $request->user();

        if ($user->role !== 'admin' && $user->id !== $ticket['user_submitter_id']) {
            return response()->json(['status_message' => 'Unauthorized'], 401);
        }

        $validatedData = $request->validated();
        $ticket->update($validatedData);

        if (isset($validatedData['category_ids'])) {
            $ticket->categories()->sync($validatedData['category_ids']);
        }

        $tickets = $this->getAuthorizedTickets($request->user());
        return TicketResource::collection($tickets);
    }

    private function getAuthorizedTickets(User $user)
    {
        $tickets = $user->role === 'admin'
            ? Ticket::all()
            : Ticket::where('user_submitter_id', $user->id)->get();
        return $tickets;
    }
}
