<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Product;
class layoutController extends Controller
{
    public function index()
    {
        // جلب كل الأصناف
        $categories = Categorie::all();

        // جلب كل المنتجات
        $products = Product::all();

        return view('layout', compact('categories', 'products'));
    }
}
