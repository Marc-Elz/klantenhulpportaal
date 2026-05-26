<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Http\Resources\TicketResource;


class TicketController extends Controller
{
    public function index()
    {
        return TicketResource::collection(Ticket::all());
    }
}
