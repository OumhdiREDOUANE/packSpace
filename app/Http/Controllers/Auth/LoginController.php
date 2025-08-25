<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required','email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'بيانات الاعتماد غير صحيحة'], 401);
        }

        $user = $request->user();

        // تحقق أن البريد مفعل
        if (!$user->hasVerifiedEmail()) {
            return response()->json(['message' => 'يجب تفعيل البريد الإلكتروني أولاً'], 403);
        }
        $token = $user->createToken('api-token')->plainTextToken;
        // إنشاء توكن جديد
       
        return response()->json([
            'message' => 'تم تسجيل الدخول بنجاح',
            "token"=>$token,
            'user' => $user,
        ]);
    }

public function logout(Request $request)
    {
     
        Auth::guard('web')->logout();

        // invalidate session
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $request->session()->regenerate();
        return response()->json(['message' => 'تم تسجيل الخروج بنجاح']);
    }
}