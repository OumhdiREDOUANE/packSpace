<?php

namespace App\Http\Controllers;
use App\Models\OrderProduct;
use App\Models\order_product_product_options;


use Illuminate\Http\Request;

class CommanderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    $validated = [];

    // تمر على كل مجموعة خيارات حسب propriétaire
    foreach ($request->all() as $key => $value) {
        if (strpos($key, 'selected_option_') === 0) {
            $validated[$key] = $value;
        }
    }
    $order = OrderProduct::create([
        'session_user' => session()->getId()
    ]);
    foreach ($validated as $productOptionId) {
        order_product_product_options::create([
            'product_option_id' => $productOptionId,
            'order_product_id' => $order->id_orderProduct
        ]);
    }

    return redirect()->route('panier.index')->with('success', 'Commande enregistrée avec succès.');
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
