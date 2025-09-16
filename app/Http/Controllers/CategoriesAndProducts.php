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
    'groups' => function ($q) {
        $q->select('id_group', 'name_group', 'categorie_id')
          ->with([
              'products:id_product,name_product,group_id'
          ]);
    },
    'products' => function($q) { // منتجات بدون مجموعة
        $q->select('id_product','name_product','categorie_id')
          ->whereNull('group_id');
    }
])
->select('id_categorie', 'name_categorie',"url")
->get()
->map(function ($categorie) {
    return [
        'id_categorie'   => $categorie->id_categorie,
        'name_categorie' => $categorie->name_categorie,
        'url' => $categorie->url,

        'groups'         => $categorie->groups->map(function ($group) {
            return [
                'id_group'   => $group->id_group,
                'name_group' => $group->name_group,
                'products'   => $group->products->map(function ($product) {
                    return [
                        'id_product'   => $product->id_product,
                        'name_product' => $product->name_product,
                    ];
                })
            ];
        }),
        'products' => $categorie->products->map(function ($product) {
            return [
                'id_product'   => $product->id_product,
                'name_product' => $product->name_product,
            ];
        })
    ];
});

return response()->json(['data' => $categories]);

   
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
