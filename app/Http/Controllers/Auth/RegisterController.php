<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules\Password;
use Exception;
use Illuminate\Support\Str;

class RegisterController extends Controller
{
   

    public function register(Request $request)
{
    try {
        // 1. التحقق من صحة البيانات
        $validated = $request->validate([
            'nomComplet' => 'required|string|max:255',
            'numero_telephone' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        // 2. إنشاء المستخدم
        $user = User::create([
            'nomComplet' => $validated['nomComplet'],
            'numero_telephone' => $validated['numero_telephone'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'remember_token' => Str::random(60),
        ]);

        // 3. إطلاق حدث التحقق من البريد
        event(new Registered($user));
       

        // 4. إرجاع رد ناجح
        return response()->json([
            'message' => 'Inscription réussie. Vérifiez votre e-mail.',
            'user' => $user  // باش تشوف واش فعلا كيتسجل
        ], 201);

    } catch (Exception $e) {
        // في حالة أي خطأ غير متوقع
        return response()->json([
            'error' => true,
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
        ], 500);
    }
}
}
