<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faq;
class FaqDashboardController extends Controller
{
 public function index()
    {
        return response()->json(Faq::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
            'category' => 'required|string',
            'is_published' => 'boolean',
        ]);

        $faq = Faq::create($data);
        return response()->json($faq, 201);
    }

    public function show(Faq $faq)
    {
        return response()->json($faq);
    }

    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);
        $data = $request->validate([
            'question' => 'sometimes|string',
            'answer' => 'sometimes|string',
            'category' => 'sometimes|string',
            'is_published' => 'sometimes|boolean',
        ]);

        $faq->update($data);
        return response()->json($faq);
    }

    public function destroy($id)
    { $faq = Faq::findOrFail($id);
        $faq->delete();
        return response()->json(null, 204);
    }}
