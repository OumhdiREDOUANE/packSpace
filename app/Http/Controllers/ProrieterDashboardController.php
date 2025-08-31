<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Proprieter;
use App\Models\Product;
use App\Models\ProductOption;
use Illuminate\Support\Facades\DB;

class ProrieterDashboardController extends Controller
{
    /**
     * Display a listing of proprieters with product and option counts
     * 
     * API Endpoints:
     * GET /api/prorieterDashboard - Show all proprieters with total counts
     * GET /api/prorieterDashboard?product_id=5 - Filter by specific product
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $productId = $request->get('product_id');
            
            if ($productId) {
                // SCENARIO: Filter by specific product
                // Show only options that are connected to this product through ProductOption table
                $proprieters = $this->getProprietersFilteredByProduct($productId);
                $message = "Proprieters filtered by product ID: {$productId}";
            } else {
                // SCENARIO: No filter  
                // Show all products count and all options count for each proprieter
                $proprieters = $this->getAllProprietersWithCounts();
                $message = "All proprieters with total counts";

            }
            $products = Product::select('id_product', 'name_product')->get();
            return response()->json([
                'status' => 'success',
                'message' => $message,
                'products'=>$products,
                'proprieters' => $proprieters,
                'total_proprieters' => count($proprieters),
                'filter_applied' => $productId ? "product_id: {$productId}" : 'none'
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch proprieters data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all proprieters with total product and option counts
     * 
     * @return array
     */
    private function getAllProprietersWithCounts()
    {
        $proprieters = Proprieter::select([
            'proprieters.id_proprieter',
            'proprieters.name_proprieter', 
            'proprieters.description_proprieter',
            // Count total unique products that use options from this proprieter
            DB::raw('(SELECT COUNT(DISTINCT po.product_id) 
                     FROM product_options po 
                     INNER JOIN options o ON po.option_id = o.id_option 
                     WHERE o.proprieter_id = proprieters.id_proprieter) as product_count'),
            // Count all options belonging to this proprieter
            DB::raw('(SELECT COUNT(*) 
                     FROM options 
                     WHERE proprieter_id = proprieters.id_proprieter) as option_count')
        ])->get();

        return $proprieters->map(function($proprieter) {
            return [
                'id_proprieter' => $proprieter->id_proprieter,
                'name_proprieter' => $proprieter->name_proprieter,
                'description_proprieter' => $proprieter->description_proprieter,
                'product_count' => (int) $proprieter->product_count,
                'option_count' => (int) $proprieter->option_count,
                'filtered_by_product' => null,
                'explanation' => 'Total counts: all products using this proprieter\'s options, all options owned by proprieter'
            ];
        })->toArray();
    }

    /**
     * Get proprieters filtered by specific product
     * Shows only options that are connected to the specified product
     * 
     * @param int $productId
     * @return array
     */
    private function getProprietersFilteredByProduct($productId)
    {
        $proprieters = Proprieter::select([
            'proprieters.id_proprieter',
            'proprieters.name_proprieter',
            'proprieters.description_proprieter',
            // Count total unique products using this proprieter's options
            DB::raw('(SELECT COUNT(DISTINCT po.product_id) 
                     FROM product_options po 
                     INNER JOIN options o ON po.option_id = o.id_option 
                     WHERE o.proprieter_id = proprieters.id_proprieter) as total_product_count'),
            // Count options from this proprieter that are used by the specific product
            DB::raw("(SELECT COUNT(*) 
                     FROM product_options po 
                     INNER JOIN options o ON po.option_id = o.id_option 
                     WHERE o.proprieter_id = proprieters.id_proprieter 
                     AND po.product_id = {$productId}) as filtered_option_count"),
            // Count all options belonging to this proprieter
            DB::raw('(SELECT COUNT(*) 
                     FROM options 
                     WHERE proprieter_id = proprieters.id_proprieter) as total_option_count')
        ])
        // Only show proprieters that have options used by this product
        ->whereExists(function($query) use ($productId) {
            $query->select(DB::raw(1))
                  ->from('product_options as po')
                  ->join('options as o', 'po.option_id', '=', 'o.id_option')
                  ->whereRaw('o.proprieter_id = proprieters.id_proprieter')
                  ->where('po.product_id', $productId);
        })
        ->get();

        return $proprieters->map(function($proprieter) use ($productId) {
            return [
                'id_proprieter' => $proprieter->id_proprieter,
                'name_proprieter' => $proprieter->name_proprieter,
                'description_proprieter' => $proprieter->description_proprieter,
                'product_count' => (int) $proprieter->total_product_count,
                'option_count' => (int) $proprieter->filtered_option_count,
                'total_options_owned' => (int) $proprieter->total_option_count,
                'filtered_by_product' => (int) $productId,
                'explanation' => "Options shown: only those used by product {$productId}. Product count: total products using any options from this proprieter"
            ];
        })->toArray();
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
        
        $validated = $request->validate([
            'name_proprieter' => 'required|string|max:255',
            'description_proprieter' => 'required|string|max:20',
            
        ]);
        $proprieters = Proprieter::create($validated);
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
    // Récupérer le proprieter par son id
    $proprieter = Proprieter::findOrFail($id);

    // Validation des données
    $validated = $request->validate([
        'name_proprieter' => 'sometimes|string|max:255',
        'description_proprieter' => 'sometimes|string|max:20',
    ]);

    // Mise à jour
    $proprieter->update($validated);

 
  
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // البحث عن proprieter
    $proprieter = Proprieter::findOrFail($id);

    // الحذف
    $proprieter->delete();
    }
}
