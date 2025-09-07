<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductsOfCategorieResource;
use Illuminate\Http\Request;
use App\Models\Categorie;
use App\Models\Product;



class CategoriesAndProducts extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    
    //     $categories = Categorie::with('products')->get();
                
        
    //   return CategoryResource::collection($categories);
            
    // }
       public function index()
{
    $categories = Categorie::with([
        'groups.products',   // كل صنف يجيب المجموعات والمنتجات ديالها
        'products'           // المنتجات اللي ماعندهاش مجموعة
    ])->get();

    return response()->json([
        'data' => $categories
    ]);
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
        ->limit(6)
        ->get();

    // ترتيب النتائج حسب أعلى سعر للطلب
    $result = $topProducts->map(function($product){
        return [
            'id_product' => $product->id_product,
            'name_product' => $product->name_product,
            'description_product' => $product->description_product,
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $name)
    {
        if ($name == "all") {
        $products = Product::with('images')->get();
      

        return response()->json([
            'data' => $products->map(function ($product) {
                return [
                    'id_product' => $product->id_product,
                    'name_product' => $product->name_product,
                    'description_product' => $product->description_product,
                    'main_image' => $product->images->first()?->url,
                ];
            })
        ]);

    }else{
            $productsOfCategorie = Categorie::where('name_categorie', $name)
        ->with('products.images')
        ->firstOrFail();
        return  ProductsOfCategorieResource::collection($productsOfCategorie->products);
        }
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
