<?php
// app/Http/Controllers/ProductController.php
namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ImageProduct;
use App\Http\Resources\ProductsOfCategorieDashboardResource;
use Illuminate\Http\Request;

class ProductDashboardController extends Controller
{
    public function index()
    {
        return ProductsOfCategorieDashboardResource::collection(
            Product::with(['categorie','images'])->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name_product' => 'required|string|max:255',
            'description_product' => 'required|nullable|string',
            'categorie_id' => 'required|exists:categories,id_categorie',
            'images' => 'required|nullable|array',
            
        ]);

        $product = Product::create($data);

        if (!empty($data['images'])) {
            foreach ($data['images'] as $url) {
                ImageProduct::create([
                    'product_id'=> $product->id_product,
                    'url' => $url
                ]);
            }
        }
    }

    public function show(Product $product)
    {
        return new ProductsOfCategorieDashboardResource($product->load(['categorie','images']));
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $data = $request->validate([
            'name_product' => 'required|string|max:255',
            'description_product' => 'required|nullable|string',
            'categorie_id' => 'required|exists:categories,id_categorie',
            'images' => 'required|nullable|array',
        ]);

        $product->update($data);
        if (isset($data['images'])) {
            // حذف الصور القديمة
            $product->images()->delete();
    
            // إضافة الصور الجديدة
            foreach ($data['images'] as $url) {
                ImageProduct::create([
                    'product_id' => $product->id_product,
                    'url' => $url
                ]);
            }
        }
    

        return new ProductsOfCategorieDashboardResource($product->load(['categorie','images']));
    }

    public function destroy($id)
    {$product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
