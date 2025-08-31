<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categorie;
use App\Models\ProductOption;
use App\Models\ImageProduct;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    protected $fillable =['name_product','categorie_id','image',"description_product"];
    protected $primaryKey = 'id_product';
 

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    public function productOptions()
    {
        return $this->hasMany(ProductOption::class, 'product_id');
    }
    public function images()
{
    return $this->hasMany(ImageProduct::class,'product_id', 'id_product');
}
}
