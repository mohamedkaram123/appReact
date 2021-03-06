<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\LanguageController;
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

Route::get('/', [HomeController::class, "showHome"])->name("home");
Route::view('{path}', 'master')->where('path', '([A-z\d\-\/_.]+)?');


// Route::get('home', [HomeController::class, "showHome"])->name("home");
