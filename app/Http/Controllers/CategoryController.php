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
           $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
            $image=$request->file('image');
            
            $uploadResult = $cloudinary->uploadApi()->upload($image->getRealPath());
    $validated['url'] = $uploadResult['secure_url'];
    $validated['public_id'] = $uploadResult['public_id'];
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

       $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
       if ($category->public_id) {
                $cloudinary->uploadApi()->destroy($category->public_id);
            }
        $image = $request->file('image'); // ملف واحد
        $uploadResult = $cloudinary->uploadApi()->upload($image->getRealPath());
        $validated['url'] = $uploadResult['secure_url'];

        $validated['public_id'] = $uploadResult['public_id'];
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
         if ($category->public_id) {
        $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
        $cloudinary->uploadApi()->destroy($category->public_id);
    }
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
