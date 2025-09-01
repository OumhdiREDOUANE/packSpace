<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PanierValider;
use App\Models\OrderProduct;

class Panier extends Model
{
    /** @use HasFactory<\Database\Factories\PanierFactory> */
    use HasFactory;
    protected $primaryKey = 'id_panier';


    protected $fillable = ['user_id','prix_panier',"status"];

    public function orderProducts()
    {
        return $this->belongsToMany(OrderProduct::class, 'panier_order_product', 'panier_id', 'order_product_id');
    }

    public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}

        
}
