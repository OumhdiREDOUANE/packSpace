<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class order_product_product_options extends Model
{
    protected $table = 'order_product_product_option';
  
    protected $fillable = ['order_product_id', 'product_option_id'];
}
