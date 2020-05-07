<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['namespace' => 'Backend', 'prefix' => 'api/admin'], function () {
    Route::post('login', 'Auth\LoginController@login')->name('login');
    Route::post('logout', 'Auth\LoginController@logout')->name('logout');
    Route::post('reset-password', 'Auth\ResetPasswordController@resetPassword')->name('password.reset');
});



Route::get('backend/{any?}', function () {
    return view('backend.index');
})->where('any', '.*');


Route::get('/home', 'HomeController@index')->name('home');
