<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Categorie;
use App\Http\Resources\proprieterResource;
use App\Http\Resources\ImageProductResource;



class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    $product = Product::with('productOptions.option.proprieter')->findOrFail($id);

    // Extraire les propriétaires avec leurs options via les productOptions
    $grouped = [];

    foreach ($product->productOptions as $productOption) {
        $option = $productOption->option;
        $proprieter = $option->proprieter;

        if (!$proprieter) continue;

        $id = $proprieter->id_proprieter;

        if (!isset($grouped[$id])) {
            $grouped[$id] = [
                'proprieter' => $proprieter,
                'options' => []
            ];
        }
        $option->prix_optionOfProduct = $productOption->prix;
        $grouped[$id]['options'][] = $option;
    }
    $images = Product::with('images')->findOrFail($id);

    // Retourner une collection de resources personnalisées
    return response()->json([
        'id_product' => $product->id_product,
        'name_product' => $product->name_product,
        'description_product' => $product->description_product,
        'image_product' => ImageProductResource::collection($images->images),
        'proprieter' => collect($grouped)->values()->map(function ($item) {
            return new proprieterResource($item);
        })
    ]);
}

//     public function show($id)
// {
//     $categories = Categorie::all();
//     $product = Product::with('productOptions.option')->findOrFail($id);

//     return proprieterResource::collection($product->productOptions->option);

// }

   

    /**
     * Show the form for editing the specified resource.
     */
  }
