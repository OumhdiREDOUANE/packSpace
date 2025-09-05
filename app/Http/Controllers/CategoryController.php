<?php
namespace App\Http\Controllers;
use Cloudinary\Cloudinary;
use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryDashboardResource;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Categorie::withCount('products')->get();
        return CategoryDashboardResource::collection($categories);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_categorie' => 'required|string|max:255',
            'description_categorie' => 'required|string|max:1000',
            'image' => 'image|mimes:jpg,jpeg,png|max:2048'
            
        ]);

        if ($request->hasFile('image')) {
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key'    => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
                'url' => ['secure' => true],
            ]);
            $image=$request->file('image');
            
            $uploadedFileUrl = $cloudinary->uploadApi()->upload($image->getRealPath())['secure_url'];
            $validated['url'] = $uploadedFileUrl;
            $category = Categorie::create($validated);
           
        }
    
        
    }

    public function show($id)
    {
        $category = Categorie::withCount('products')->findOrFail($id);
        return new CategoryDashboardResource($category);
    }

  public function update(Request $request, $id)
{
    $category = Categorie::findOrFail($id);

    // التحقق من صحة البيانات
    $validated = $request->validate([
        'name_categorie' => 'required|string|max:255',
        'description_categorie' => 'required|string|max:1000',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    // إذا تم رفع صورة جديدة
    if ($request->hasFile('image')) {
        $cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                'api_key'    => env('CLOUDINARY_API_KEY'),
                'api_secret' => env('CLOUDINARY_API_SECRET'),
            ],
            'url' => ['secure' => true],
        ]);

        $image = $request->file('image'); // ملف واحد
        $uploadedFileUrl = $cloudinary->uploadApi()->upload($image->getRealPath())['secure_url'];
        $validated['url'] = $uploadedFileUrl;
    }

    // تحديث الفئة
    $category->update($validated);

    return response()->json([
        'message' => 'Category updated successfully',
        'data' => $category,
    ], 200);
}



    public function destroy($id)
    {
        $category = Categorie::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
