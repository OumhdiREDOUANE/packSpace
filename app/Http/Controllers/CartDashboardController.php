<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Panier;
use Illuminate\Support\Facades\Auth;

class CartDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
{
    $user = Auth::user();

    if ($user->role === 'admin') {
        
        $paniers = Panier::with([
            'user',
            'orderProducts.productOptions.product.images'
        ])->get();
    } else {
        // إذا لم يكن admin، جلب فقط panier الخاص بالمستخدم
        $paniers = Panier::with([
            'user',
            'orderProducts.productOptions.product.images'
        ])->where('user_id', $user->id_user)->get();
    }

    $result = $paniers->map(function ($panier) {
        $orders = $panier->orderProducts->map(function ($order) {
            $firstOption = $order->productOptions->first();
            $product = $firstOption?->product;
            $image = $product?->images->first();

            return [
                'order_id' => $order->id_orderProduct,
                'prix_orderProduct' => $order->prix_orderProduct,
                'product' => $product ? [
                    'id_product' => $product->id_product,
                    'name_product' => $product->name_product,
                    'image' => $image?->url ?? null,
                ] : null
            ];
        });

        return [
            'panier_id' => $panier->id_panier,
            'role' =>  Auth::user()->role ?? null,
            'user' => [
                'id_user' => $panier->user?->id_user ?? null,
                
                'name' => $panier->user?->nomComplet ?? null,
                'numero_telephone' => $panier->user?->numero_telephone ?? null,
                'email' => $panier->user?->email ?? null,
            ],
            'orders' => $orders,
            'status' => $panier->status,
            'total_prix' => $panier->prix_panier,
            'created_at' => $panier->created_at
        ];
    });

    return response()->json($result);
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
        //
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
    public function update(Request $request, string $id)
    {
        $request->validate([
        'status' => 'required|in:Pending,Completed,Delivered,Cancelled',
    ]);

    // Récupérer le panier par ID
    $panier = Panier::find($id);

    if (!$panier) {
        return response()->json([
            'message' => 'Panier non trouvé.'
        ], 404);
    }

    // Mettre à jour le status
    $panier->status = $request->status;
    $panier->save();

    return response()->json([
        'message' => 'Status du panier mis à jour avec succès.',
        'panier' => $panier
    ], 200);
}
    

    /**
     * Remove the specified resource from storage.
     */
    
}
