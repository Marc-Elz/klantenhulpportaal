<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Http\Resources\TicketResource;


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
}
