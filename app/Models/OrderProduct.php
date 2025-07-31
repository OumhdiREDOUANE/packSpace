<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductOption;
use App\Models\Panier;


class OrderProduct extends Model
{
    /** @use HasFactory<\Database\Factories\OrderProductFactory> */
    use HasFactory;
    protected $primaryKey = 'id_orderProduct';
    

    protected $fillable = ['session_user'];
    
    public function productOptions()
    {
        return $this->belongsToMany(ProductOption::class, 'order_product_product_option', 'order_product_id', 'product_option_id');
    }

    public function paniers()
    {
        return $this->belongsToMany(Panier::class, 'panier_order_product', 'order_product_id', 'panier_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    }
