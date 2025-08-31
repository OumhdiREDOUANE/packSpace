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
        try {
            // Récupérer seulement id_product et name_product
            $products = Product::select('id_product', 'name_product')->get();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Products fetched successfully',
                'data' => $products,
                'total_products' => $products->count(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch products',
                'error' => $e->getMessage(),
            ], 500);
        }
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
    $sessionId = $request->header('X-Session-Id');
    // تمر على كل مجموعة خيارات حسب propriétaire
    foreach ($request->all() as $key => $value) {
        if (strpos($key, 'selected_option_') === 0) {
            $validated[$key] = $value;
        }
    }
    $order = OrderProduct::create([
        'session_user' => $sessionId,
        'user_id' =>null
    ]);
     foreach ($validated as $productOptionId) {
        $order_product_product_option = OrderProductProductOption::create([
            'product_option_id' => $productOptionId,
            'order_product_id' => $order->id_orderProduct
        ]);
    }

    return response()->json([
        "success" => true,
        'session_id' => session()->getId(),
        "order" => $order_product_product_option,
        "options" => $validated
    ], 201);
    
}
public function update(Request $request, $id)
{
    $sessionId = $request->header('X-Session-Id');

    // نجيب order ديال هاد session والـ id
    $order = OrderProduct::where('id_orderProduct', $id)
        ->where('session_user', $sessionId)
        ->firstOrFail();

    // نمسح جميع الـ options القديمة
    OrderProductProductOption::where('order_product_id', $order->id_orderProduct)->delete();

    // نفس المنطق ديال validation
    $validated = [];
    foreach ($request->all() as $key => $value) {
        if (strpos($key, 'selected_option_') === 0) {
            $validated[$key] = $value;
        }
    }

    // نضيف الـ options الجدد
    foreach ($validated as $productOptionId) {
        OrderProductProductOption::create([
            'product_option_id' => $productOptionId,
            'order_product_id' => $order->id_orderProduct
        ]);
    }

    return response()->json([
        "success" => true,
        "order"   => $order,
        "options" => $validated
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
