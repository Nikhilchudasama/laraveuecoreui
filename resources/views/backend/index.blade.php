<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name') }}</title>
        <link href="{{ asset('css/backend/app.css') }}" rel="stylesheet"></link>

    </head>
    <body class="app header-fixed sidebar-fixed aside-menu-off-canvas sidebar-lg-show">
        <div id="backend" :class="bodyClass">
            <router-view></router-view>
        </div>

        <script src="{{ asset('js/backend/app.js') }}"></script>
        <script src="{{ asset('js/backend/vue-application.js') }}"></script>
    </body>
</html>
