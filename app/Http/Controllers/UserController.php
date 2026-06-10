<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyUserRequest;
use App\Http\Resources\AdminResource;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user->isAdmin()) {
            // Users do not need emailinfo or non user information
            $users = User::admins()->get();
            return AdminResource::collection($users);
        }

        $users = User::all();
        return UserResource::collection($users);
    }

    public function destroy(DestroyUserRequest $request, User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User succesvol verwijderd']);
    }
}
