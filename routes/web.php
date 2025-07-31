<?php

use App\Http\Controllers\CommanderController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\LoginController;


// API routes with 'api' middleware and prefix
// Route::middleware('api')->prefix('api')->group(function () {
//     Route::resource('/products',ProductController::class);
// });
// Route::get('/', function () {
//     return view('welcome');
// });
use App\Http\Controllers\layoutController;
use App\Http\Controllers\PanierController;
use Illuminate\Auth\Events\Login;

// Route::get('/', [layoutController::class, 'index'])->name('index');
// Route::get('/login',function(){
//     return view("login");
// })->name('login');
// Route::get('/email-verified-success', function () {
//     return 'تم التحقق من بريدك الإلكتروني بنجاح ✔️';
// });
// Route::post('/login', [LoginController::class, 'login']);
Route::resource('product', ProductController::class);
Route::resource('commande', CommanderController::class);
Route::resource('panier', PanierController::class);
Route::post('/valider-panier', [PanierController::class, 'valider'])->name('valider.panier');
