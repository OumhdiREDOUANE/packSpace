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
    public function index()
    {
    
        $categories = Categorie::with('products')->get();
                
        
      return CategoryResource::collection($categories);
            
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
    public function show(string $id)
    {
        $productsOfCategorie = Categorie::with('products.images')->findOrFail($id);
   
      return  ProductsOfCategorieResource::collection($productsOfCategorie->products);
        
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
