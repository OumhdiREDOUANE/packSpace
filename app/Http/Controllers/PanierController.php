<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\OrderProduct;

use App\Models\order_product_product_options;
use App\Http\Resources\PanierResource;

use App\Models\Panier;


class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function valider(Request $request)
{
    $user = $request->user(); // هذا يعمل فقط مع middleware auth:sanctum

    $panier = Panier::create([
        'user_id' => $user->id_user,
    ]);

    $orders = OrderProduct::where('session_user', session()->getId())->get();

    foreach ($orders as $order) {
        DB::table('panier_order_product')->insert([
            'panier_id' => $panier->id_panier,
            'order_product_id' => $order->id_orderProduct,
        ]);
    }

    return response()->json(['message' => 'Panier validé avec succès']);
}

    public function index()
    {

        $orders = OrderProduct::with('productOptions.option.proprieter', 'productOptions.product.images')
            ->where('session_user', session()->getId())
            ->get();


        return PanierResource::collection($orders);
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

   


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $orders = OrderProduct::with('productOptions.option.proprieter', 'productOptions.product.images')
            ->where('session_user', $id)
            ->get();
        if ($orders) {

            return PanierResource::collection($orders);
        }
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
