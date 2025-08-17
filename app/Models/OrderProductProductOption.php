<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderProductProductOption extends Model
{
    protected $table = 'order_product_product_options';
  
    protected $fillable = ['order_product_id', 'product_option_id'];
}
