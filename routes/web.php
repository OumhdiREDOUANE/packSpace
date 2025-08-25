<?php

use App\Http\Controllers\CommanderController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Models\User;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;
// use App\Http\Controllers\ProductController;
// use App\Http\Controllers\Auth\LoginController;


// // API routes with 'api' middleware and prefix
// // Route::middleware('api')->prefix('api')->group(function () {
// //     Route::resource('/products',ProductController::class);
// // });
// // Route::get('/', function () {
// //     return view('welcome');
// // });
// use App\Http\Controllers\layoutController;
// use App\Http\Controllers\PanierController;
// use Illuminate\Auth\Events\Login;

// // Route::get('/', [layoutController::class, 'index'])->name('index');
// // Route::get('/login',function(){
// //     return view("login");
// // })->name('login');
// // Route::get('/email-verified-success', function () {
// //     return 'تم التحقق من بريدك الإلكتروني بنجاح ✔️';
// // });
// // Route::post('/login', [LoginController::class, 'login']);
// Route::resource('product', ProductController::class);
// Route::resource('commande', CommanderController::class);
// Route::resource('panier', PanierController::class);
// Route::post('/valider-panier', [PanierController::class, 'valider'])->name('valider.panier');
Route::get('/email/verify/{id}/{hash}', function ($id, $hash) {
    $user = User::findOrFail($id);

    if (! hash_equals(sha1($user->getEmailForVerification()), $hash)) {
        return response()->json(['message' => 'الرابط غير صالح أو منتهي'], 403);
    }

    if (! $user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
        Log::info("Email verified for user {$user->id_user}");
    }

    return response()->json(['message' => 'تم تفعيل البريد الإلكتروني بنجاح']);
})->name('verification.verify');