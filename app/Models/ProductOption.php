<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Option;
use App\Models\Product;
use App\Models\OrderProduct;

class ProductOption extends Model
{
    /** @use HasFactory<\Database\Factories\ProductOptionFactory> */
    use HasFactory;
    protected $primaryKey = 'id_ProductOption';
    
    protected $fillable = ['product_id', 'option_id', 'prix'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function option()
    {
        return $this->belongsTo(Option::class, 'option_id');
    }

    public function orderProducts()
    {
        return $this->belongsToMany(OrderProduct::class, 'order_product_product_option', 'product_option_id', 'order_product_id');
    }
}
