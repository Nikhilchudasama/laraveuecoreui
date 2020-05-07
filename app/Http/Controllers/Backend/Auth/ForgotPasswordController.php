<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    /**
     * Sends an email for the forgot password request.
     *
     * @return void
     **/
    public function forgotPassword()
    {
        request()->validate([
            'email' => 'required|email|max:255|exists:users,email'
        ]);

        if (User::where('email', request('email'))->exists()) {
            $this->broker()->sendResetLink(["email" => request('email')]);
        }
    }
}
