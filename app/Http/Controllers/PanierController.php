<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\OrderProduct;
use App\Models\OrderProductProductOption;


use App\Http\Resources\PanierResource;

use App\Models\Panier;


class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function valider(Request $req)
{
    $user_id =Auth::id(); // هذا يعمل فقط مع middleware auth:sanctum
    $prix = $req->input('prix');
    $id_session = $req->header('X-Session-Id');
    $panier = Panier::create([
        'user_id' => $user_id,
        "prix_panier"=>$prix
    ]);

    $orders = OrderProduct::where(function($query) use ($id_session, $user_id) {
    $query->where('session_user', $id_session)
          ->orWhere('user_id', $user_id);
})
->where('status', '!=', 'Validated')
    ->get();
    if ($orders->isEmpty()) {
        return response()->json(['message' => 'Aucun produit dans le panier'], 400);
    }else{

        foreach ($orders as $order) {
            DB::table('panier_order_product')->insert([
                'panier_id' => $panier->id_panier,
                'order_product_id' => $order->id_orderProduct,
                
            ]);
            $order->update([
            'status' =>"Validated",
        ]);
        }
        
        return response()->json(['message' => 'Panier validé avec succès']);
    }
}

    // public function index()
    // {
    //     $id = session()->getId();
    //     $orders = OrderProduct::with('productOptions.option.proprieter', 'productOptions.product.images')
    //         ->where('session_user', $id)
    //         ->get();


    //     return response()->json([
    //     'data'=>PanierResource::collection($orders),
    //     "id"=>$id
    //     ]);
    // }

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
   
   

    public function show(string $id_session)
    {
        try {
            if (Auth::check()) {
                $user_id = Auth::id();
                $orders = OrderProduct::with([
                        'productOptions.option.proprieter',
                        'productOptions.product.images'
                    ])
                    ->where(function($query) use ($user_id, $id_session) {
                $query->where('user_id', $user_id)
                      ->orWhere('session_user', $id_session);
            })
            ->where('status', '!=', 'Validated')
                    ->get();
            } else {
                // إذا المستخدم غير مسجل الدخول نستعمل session_user
                $orders = OrderProduct::with([
                        'productOptions.option.proprieter',
                        'productOptions.product.images'
                    ])
                    ->where('session_user', $id_session)
                    ->where('status', '!=', 'Validated')
                    ->get();
            }
            

        return response()->json([
            "id"=>Auth::id(),
            
            'data' => PanierResource::collection($orders)
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ], 500);
    };
    }
    public function showNotLogin(string $id_session)
    {
        try {
            
                // إذا المستخدم غير مسجل الدخول نستعمل session_user
                $orders = OrderProduct::with([
                        'productOptions.option.proprieter',
                        'productOptions.product.images'
                    ])
                    ->where('session_user', $id_session)
                    ->get();
            


        return response()->json([
           
            'data' => PanierResource::collection($orders)
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ], 500);
    };
    }
public function CountCart(Request $request)
{
    
        $id_session = $request->query('session_user');
        $count = OrderProduct::where('user_id', Auth::id())
        
                    ->orWhere('session_user', $id_session)->count();
   

    return response()->json([
        "countOfOrder" => $count
    ]);
}
public function CountCartNotLogin(Request $request){
     
        $id_session = $request->query('session_user'); // أو من الكوكيز
        $count = OrderProduct::where('session_user', $id_session)->count();
    

    return response()->json([
        "countOfOrder" => $count
    ]);
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
   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = OrderProduct::find($id);
        if (!$order) {
            return response()->json(['success' => false, 'message' => 'Order not found'], 404);
        }
    
        $order->delete();
    
        return response()->json(['success' => true, 'message' => 'Order deleted successfully']);
    }
}
