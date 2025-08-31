<?php
namespace App\Http\Controllers;

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
        ]);

        $category = Categorie::create($validated);
        
    }

    public function show($id)
    {
        $category = Categorie::withCount('products')->findOrFail($id);
        return new CategoryDashboardResource($category);
    }

    public function update(Request $request, $id)
    {
        $category = Categorie::findOrFail($id);
  
        $category->update($request->all());
        
    }

    public function destroy($id)
    {
        $category = Categorie::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
