<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Cloudinary\Cloudinary;

class SettingController extends Controller
{
    public function index()
    {
        // récupérer toujours le premier enregistrement
        $setting = Setting::first();
        return response()->json($setting);
    }

    public function update(Request $request, $id)
    {
        $setting = Setting::findOrFail($id);

        $validated = $request->validate([
            'contact_phone'    => 'required|string|max:20',
            'contact_whatsapp' => 'required|string|max:20',
            'contact_email'    => 'required|email|max:255',
            'promo_code'       => 'nullable|string|max:50',
            'url_image_hero'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // upload Cloudinary seulement si nouvelle image
        if ($request->hasFile('url_image_hero')) {
            $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));

            // supprimer l’ancienne image si elle existe
            if ($setting->public_id) {
                $cloudinary->uploadApi()->destroy($setting->public_id);
            }

            $image        = $request->file('url_image_hero');
            $uploadResult = $cloudinary->uploadApi()->upload($image->getRealPath());

            $validated['url_image_hero'] = $uploadResult['secure_url'];
            $validated['public_id']      = $uploadResult['public_id'];
        }

        // mise à jour de l’enregistrement
        $setting->update($validated);

        return response()->json($setting);
    }
}
