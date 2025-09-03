<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faq;
class FaqController extends Controller
{
    public function index()
    {
        // Récupère uniquement les FAQ publiées
        $faqs = Faq::where('is_published', true)->get();

        return response()->json($faqs);
    }
}
