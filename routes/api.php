<?php

use App\Http\Controllers\CategoriesAndProducts;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductDashboardController;
use App\Http\Controllers\ProrieterDashboardController;
use App\Http\Controllers\OptionDashboardController;
use App\Http\Controllers\CartDashboardController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\GroupController;


use App\Http\Controllers\OrderDashboardController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FaqDashboardController;
use App\Http\Controllers\BlogDashboardController;
use App\Http\Controllers\BlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('users',UserController::class);
Route::apiResource('/categories', CategoriesAndProducts::class);
Route::apiResource('/categoryDashboard', CategoryController::class);
Route::apiResource('/OrderDashboard', OrderDashboardController::class);
Route::get('/product/topProducts',[ProductController::class,'topProducts']);
Route::apiResource('/product', ProductController::class);
Route::apiResource('/groupsDashboard', GroupController::class);

Route::apiResource('/blogs', BlogController::class);
Route::apiResource('/productDashboard', ProductDashboardController::class);
Route::apiResource('/proprieterDashboard', ProrieterDashboardController::class);
Route::apiResource('/setting', SettingController::class);
Route::apiResource('/optionDashboard', OptionDashboardController::class);
Route::apiResource('/CartDashboard', CartDashboardController::class)->middleware('auth:sanctum');
Route::apiResource('FaqDashboard', FaqDashboardController::class);
Route::apiResource('BlogDashboard', BlogDashboardController::class);
Route::post('/product', [ProductController::class,"store"]);
Route::apiResource('/cart', PanierController::class)->only("show")->middleware('auth:sanctum');
Route::delete('/cart/notLogin/{id}', [PanierController::class, 'destroy']);
Route::apiResource('/faqs', FaqController::class);
Route::get('/cart/notLogin/{id}', [PanierController::class, 'showNotLogin']);
Route::post('/cart/valider-panier', [PanierController::class, 'valider'])->middleware('auth:sanctum');
Route::get('/count', [PanierController::class, 'CountCart'])->middleware('auth:sanctum');
Route::get('/count/notLogin', [PanierController::class, 'CountCartNotLogin']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::get('/images/product/{id}', [ProductController::class, 'getByProduct']);
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
// Route لتأكيد البريد الإلكتروني
Route::apiResource('/save', OrderController::class)->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/check-admin', function (Request $request) {
    // التحقق من دور المستخدم
    if ($request->user()->role !== 'admin') {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    return response()->json(['message' => 'OK']);
});
Route::middleware('auth:sanctum')->get('/navbarDashboard', function (Request $request) {
    return response()->json([
      
        'name' => $request->user()->nomComplet,
        'email' => $request->user()->email,
        
    ]);
});
// Route لإعادة إرسال رابط التحقق
// Route::post('/email/verification-notification', function (Request $request) {
//     if ($request->user()->hasVerifiedEmail()) {
//         return response()->json(['message' => 'Email already verified.']);
//     }

//     $request->user()->sendEmailVerificationNotification();
//     return response()->json(['message' => 'Verification link sent!']);
// })->middleware(['auth:sanctum']);

