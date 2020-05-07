<?php

namespace App\Mail\Backend;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @param \App\User $user
     * @param string $token
     * @return void
     */
    public function __construct($user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Reset your '.config('app.name').' password')
            ->markdown('emails.reset_password_email')->with([
            'user' => $this->user,
            'token' => $this->token,
            ]);
    }
}
