<?php


Route::middleware(['auth:api'])->group(function () {
    Route::get('users', 'UserController@index');
    Route::post('user', 'UserController@store');
    Route::get('user/{user}/edit', 'UserController@edit');
    Route::post('user/{user}', 'UserController@update');
    Route::delete('user/{user}', 'UserController@destroy');
});
