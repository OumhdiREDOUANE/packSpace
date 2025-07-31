<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nomComplet' => 'required|string|max:255',
            'numero_telephone' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'nomComplet' => $request->nomComplet,
            'numero_telephone' => $request->numero_telephone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // إرسال رابط التحقق
        event(new Registered($user));

        return response()->json(['message' => 'Inscription réussie. Vérifiez votre e-mail.']);
    }
}
