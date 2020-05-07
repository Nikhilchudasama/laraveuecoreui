@component('mail::message')
    # Forgot your password? Don't worry, we've got you covered!

    {{ $user->name }}, we just received a request to reset your {{ config('app.name') }} account password.
    Please click on the following button to reset your password.

    @component('mail::button', [
        'url' => url('/backend/reset-password/'.$token.'/'.$user->email)
    ])
        Reset my password
    @endcomponent

    Didn't request a password reset? Simply ignore this email.

    Best,<br>
    The {{ config('app.name') }} Team
@endcomponent
