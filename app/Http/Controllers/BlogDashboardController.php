<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Cloudinary\Cloudinary;
class BlogDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Blog::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
           'image' => 'image|mimes:jpg,jpeg,png|max:2048',
            'category' => 'required|string|max:50',
            'status' => 'required|in:draft,published',
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
            $validated['image_blog'] = $uploadedFileUrl;
           
           
            $blog = Blog::create($validated);
        }
        return response()->json($blog, 201);
    }

    public function show($id)
    {
        $blog = Blog::findOrFail($id);
        return response()->json($blog);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'excerpt' => 'sometimes|required|string|max:500',
            'content' => 'sometimes|required|string',
            'author' => 'sometimes|required|string|max:255',
          'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'category' => 'sometimes|required|string|max:50',
            'status' => 'sometimes|required|in:draft,published',
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
            $validated['image_blog'] = $uploadedFileUrl;
            
           
            $blog->update($validated);
        }
        return response()->json($blog);
    }

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();
        return response()->json(['message' => 'Blog deleted successfully']);
    }
}
