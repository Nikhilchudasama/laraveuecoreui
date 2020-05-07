<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Reset the password of the user and logs him/her in.
     *
     * @return \Illuminate\Http\JsonResponse | Exception
     **/
    public function resetPassword(Request $request)
    {
        request()->validate([
            'token' => 'required',
            'email' => 'required|email|max:255|exists:users,email',
            'password' => 'required|confirmed|min:8',
        ]);

        $response = $this->broker()->reset(
            $this->credentials($request),
            function ($user, $password) {
                $user->password = bcrypt($password);
                $user->save();
                Auth::login($user);
            }
        );

        if ($response == Password::PASSWORD_RESET) {
            $user = Auth::user();

            return [
                'user' => $user,
            ];
        }

        return abort(401, 'Incorrect details');


    }
}
