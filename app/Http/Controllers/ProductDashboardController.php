<?php
// app/Http/Controllers/ProductController.php
namespace App\Http\Controllers;
use Cloudinary\Cloudinary;

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
            'images.*' => 'image|mimes:jpg,jpeg,png|max:2048'
            
            
        ]);
        

        $product = Product::create($data);

       if ($request->hasFile('images')) {
        $cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key'    => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
            'url' => ['secure' => true],
        ]);

        foreach ($request->file('images') as $image) {
            $uploadedFileUrl = $cloudinary->uploadApi()->upload($image->getRealPath())['secure_url'];

            ImageProduct::create([
                'product_id' => $product->id_product,
                'url' => $uploadedFileUrl,
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
            'images.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $product->update($data);
         $existingImages = $request->input('existing_images', []);
    
    // حذف الصور القديمة التي لم يتم الاحتفاظ بها
    $product->images()->whereNotIn('url', $existingImages)->delete();
       if ($request->hasFile('images')) {
        
        $cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key'    => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
            'url' => ['secure' => true],
        ]);

        foreach ($request->file('images') as $image) {
            $uploadedFileUrl = $cloudinary->uploadApi()->upload($image->getRealPath())['secure_url'];

            ImageProduct::create([
                'product_id' => $product->id_product,
                'url' => $uploadedFileUrl,
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
