<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\Auth\LoginRequest;
use App\Http\Resources\Backend\Auth\UserResource;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Login a user.
     *
     * @return \Illuminate\Http\JsonResponse | Exception
     **/
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            return [
                'user' => new UserResource($user),
            ];
        }

        return abort(401, 'Incorrect credentials');
    }

    /**
     * Log out user
     *
     * @return void
     **/
    public function logout()
    {
        Auth::logout();
    }
}
