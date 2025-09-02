<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Categorie;
use App\Http\Resources\proprieterResource;
use App\Http\Resources\ImageProductResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\OrderProduct;

use App\Models\OrderProductProductOption;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
{
    try {
        $query = Product::select('id_product', 'name_product');

        // فلترة حسب search query إذا وجد
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where('name_product', 'like', "%{$search}%");
        }

        $products = $query->get();

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

public function topProducts()
{
    // نجلب المنتجات مع أعلى سعر لكل منتج بناءً على الطلبات
    $topProducts = Product::with('images')
        ->select('id_product', 'name_product', 'description_product')
        ->withMax('productOptions as max_price', 'prix') // أعلى سعر لكل منتج من productOptions المرتبطة بالطلب
        ->with(['images' => function($q) {
            $q->limit(1); // صورة واحدة فقط لكل منتج
        }])
        ->withCount(['productOptions as total_orders' => function($query){
            $query->select(DB::raw('count(*)'));
        }])
        ->orderByDesc('total_orders')
        ->limit(8)
        ->get();

    // ترتيب النتائج حسب أعلى سعر للطلب
    $result = $topProducts->map(function($product){
        return [
            'id_product' => $product->id_product,
            'name_product' => $product->name_product,
            'description_product' => $product->description_product?? null,
            'max_prix' => $product->max_price,
            'image' => $product->images->first() ? new ImageProductResource($product->images->first()) : null,
        ];
    });

    return response()->json([
        'status' => 'success',
        'data' => $result
    ]);
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
        'user_id' =>null,
        'prix_orderProduct'=>$request->prix_orderProduct
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
OrderProduct::where('id_orderProduct', $id)
    ->update(['prix_orderProduct' =>$request->prix_orderProduct ]);
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
