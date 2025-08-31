<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\Proprieter;
use App\Models\ProductOption;
use Illuminate\Http\Request;

class OptionDashboardController extends Controller
{
    /**
     * 1. Show all options (name_option, image_option, count of proprieter)
     */
    public function index(Request $request)
    {
        $query = Option::query();
    
        $hasProductFilter = $request->has('product_id') && $request->product_id != 'all';
    
        // Filter by proprieter
        if ($request->has('proprieter_id') && $request->proprieter_id != 'all') {
            $query->where('proprieter_id', $request->proprieter_id);
        }
    
        // Filter by product
        if ($hasProductFilter) {
            $query->whereHas('productOptions', function($q) use ($request) {
                $q->where('product_id', $request->product_id);
            });
        }
    
        $options = $query->with('proprieter')
            ->with(['productOptions' => function($q) use ($hasProductFilter, $request) {
                if ($hasProductFilter) {
                    $q->where('product_id', $request->product_id);
                }
            }])
            ->get()
            ->map(function($opt) use ($hasProductFilter) {
                return [
                    'id_option'       => $opt->id_option,
                    'name_option'       => $opt->name_option,
                    'image_option'      => $opt->image_option,
                    'description_option'=> $opt->description_option ?? null,
                    'count_proprieter'  => $opt->proprieter ? 1 : 0,
                    'prix'              => $hasProductFilter 
                                            ? ($opt->productOptions->first()->prix ?? null) 
                                            : null,
                ];
            });
    
        return response()->json($options);
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
   public function store(Request $request)
{
    
    $request->validate([
        'name_option' => 'required|string|max:255',
        'description_option' => 'required|string',
        'image_option' => 'required|string', // أو file إذا سترفع صورة
        'proprieter_id' => 'required|exists:proprieters,id_proprieter',
        'product_id' => 'required|exists:products,id_product',
        'prix' => 'required|numeric',
    ]);

    // 2️⃣ Create new Option
    $option = \App\Models\Option::create([
        'name_option' => $request->name_option,
        'description_option' => $request->description_option ,
        'image_option' => $request->image_option ,
        'proprieter_id' => $request->proprieter_id,
    ]);

    // 3️⃣ If product_id is provided, create ProductOption relation
    if ($request->filled('product_id')) {
        \App\Models\ProductOption::create([
            'product_id' => $request->product_id,
            'option_id' => $option->id_option,
            'prix' => $request->prix ?? null,
        ]);
    }

    // 4️⃣ Return the created option as JSON
    return response()->json([
        'success' => true,
        'option' => $option,
    ]);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
 public function update(Request $request, $id)
{
    // ✅ Validation
    $request->validate([
        'name_option' => 'required|string|max:255',
        'description_option' => 'required|string',
        'image_option' => 'required|string',
        'proprieter_id' => 'nullable|exists:proprieters,id_proprieter',
        'product_id' => 'nullable|exists:products,id_product',
        'prix' => 'nullable|numeric',
    ]);

    // ✅ جلب option
    $option = \App\Models\Option::findOrFail($id);

    // ✅ تحديث الحقول الأساسية
    $option->name_option = $request->name_option;
    $option->description_option = $request->description_option;
    $option->image_option = $request->image_option;

    // ✅ تحديث proprieter_id فقط إذا كان مملوء
    if ($request->filled('proprieter_id')) {
        $option->proprieter_id = $request->proprieter_id;
    }

    $option->save();

    // ✅ تحديث ProductOption
    $productOption = \App\Models\ProductOption::where('option_id', $option->id_option)->first();

    if ($productOption) {
        $data = [];
        if ($request->filled('product_id')) {
            $data['product_id'] = $request->product_id;
        }
        if ($request->filled('prix')) {
            $data['prix'] = $request->prix;
        }
        if (!empty($data)) {
            $productOption->update($data);
        }
    } else {
        if ($request->filled('product_id') && $request->filled('prix')) {
            \App\Models\ProductOption::create([
                'option_id' => $option->id_option,
                'product_id' => $request->product_id,
                'prix' => $request->prix,
            ]);
        }
    }

    return response()->json([
        'success' => true,
        'option' => $option,
    ]);
}




    /**
     * Remove the specified resource from storage.
     */
   public function destroy($id)
{
    // ✅ 1- جلب الـ option
    $option = Option::findOrFail($id);

    // ✅ 3- حذف option نفسه
    $option->delete();

    // ✅ 4- رجوع response
    return response()->json([
        'success' => true,
        'message' => 'Option supprimée avec succès'
    ]);
}
}
