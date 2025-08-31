<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
class Categorie extends Model
{
    /** @use HasFactory<\Database\Factories\CategorieFactory> */
    use HasFactory;
    protected $primaryKey = 'id_categorie';
    

    protected $fillable = ['name_categorie',"description_categorie"];

    public function products()
    {
        return $this->hasMany(Product::class, 'categorie_id');
    }
    
}
