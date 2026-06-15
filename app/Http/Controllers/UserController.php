<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyUserRequest;
use App\Http\Requests\updateUserRequest;
use App\Http\Resources\AdminResource;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\Ticket;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user->isAdmin()) {
            // Users need only know the names, ids of admins. They do not need emailinfo or names of other regular users.
            $users = User::admins()->get();
            return AdminResource::collection($users);
        }

        $users = User::all();
        return UserResource::collection($users);
    }

    public function update(updateUserRequest $request, User $user)
    {
        $validatedData = $request->validated();
        $user->update($validatedData);

        $users = User::all();
        return UserResource::collection($users);
    }

    public function destroy(DestroyUserRequest $request, User $user)
    {
        $query = Ticket::where('user_submitter_id', $user->id)
            ->where(function ($innerquery) {
                $innerquery->where('status', "open")
                    ->orWhere('status', "in_progress");
            })
            ->first();

        if ($query) {
            throw new HttpResponseException(response()->json([
                'message' => 'User kon niet worden verwijderd omdat deze gekoppeld is aan 1 of meer tickets'
            ], 422));
        }

        $user->delete();
        return response()->json(['message' => 'User succesvol verwijderd']);
    }
}
