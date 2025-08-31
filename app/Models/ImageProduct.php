<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
class ImageProduct extends Model
{
    /** @use HasFactory<\Database\Factories\ImageProductFactory> */
    use HasFactory;
    
    

    protected $fillable = ['url',"product_id"];
    public function product()
{
    return $this->belongsTo(Product::class);
}
}
