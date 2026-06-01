<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Http\Resources\TicketResource;
use App\Http\Requests\StoreTicketRequest;
use Illuminate\Support\Facades\Log;


class TicketController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $tickets = $user->role === 'admin'
            ? Ticket::all()
            : Ticket::where('user_submitter_id', $user->id)->get();

        return TicketResource::collection($tickets);
    }

    public function store(StoreTicketRequest $request)
    {

        // ignore any user_submitter_id from frontend to prevent users from submitting tickets in the name of other users
        $user = $request->user();
        //$validatedData = $request->validated();
        // $validatedData = $request->merge(['user_submitter_id' => $user->id, 'status' => "open"]);
        Log::debug('initial');
        Log::debug($request);

        $validatedData = $request->validated();
        $validatedData['user_submitter_id'] = $user->id;
        Log::debug('Final Data: ');
        Log::debug($validatedData);

        $ticket = Ticket::create($validatedData);


        $tickets = Ticket::all();
        return TicketResource::collection($tickets);
    }
}
