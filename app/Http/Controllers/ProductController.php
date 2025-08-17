<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Categorie;
use App\Http\Resources\proprieterResource;
use App\Http\Resources\ImageProductResource;

use Illuminate\Http\Request;
use App\Models\OrderProduct;

use App\Models\OrderProductProductOption;

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
    public function show($name)
{
    
    $product = Product::with('productOptions.option.proprieter')
    ->where('name_product', $name)
    ->firstOrFail();
    

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
        $option->id_ProductOption = $productOption->id_ProductOption;
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
public function store(Request $request)
{
    $validated = [];

    // تمر على كل مجموعة خيارات حسب propriétaire
    foreach ($request->all() as $key => $value) {
        if (strpos($key, 'selected_option_') === 0) {
            $validated[$key] = $value;
        }
    }
    $order = OrderProduct::create([
        'session_user' => session()->getId()
    ]);
     foreach ($validated as $productOptionId) {
        $order_product_product_option = OrderProductProductOption::create([
            'product_option_id' => $productOptionId,
            'order_product_id' => $order->id_orderProduct
        ]);
    }

    return response()->json([
        "success" => true,
        "order" => $order_product_product_option,
        "options" => $validated
    ], 201);
    
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
