<?php

// app/Http/Controllers/SettingController.php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $setting = Setting::first();
        return response()->json($setting);
    }

    public function update(Request $request, $id)
    {
        $setting = Setting::findOrFail($id);
         $request->validate([
        'contact_phone'    => 'required|string|max:20',
        'contact_whatsapp' => 'required|string|max:20',
        'contact_email'    => 'required|email|max:255',
        'promo_code'       => 'nullable|string|max:50',
    ]);
        $setting->update($request->only([
            'contact_phone',
            'contact_whatsapp',
            'contact_email',
            'promo_code',
        ]));
        return response()->json($setting);
    }
}
