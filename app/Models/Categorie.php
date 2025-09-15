<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Group;
class Categorie extends Model
{
    /** @use HasFactory<\Database\Factories\CategorieFactory> */
    use HasFactory;
    protected $primaryKey = 'id_categorie';
    

    protected $fillable = ['name_categorie',"description_categorie","url","public_id"];

    public function products()
    {
        return $this->hasMany(Product::class, 'categorie_id');
    }
   public function groups()
    {
        return $this->hasMany(Group::class, 'categorie_id', 'id_categorie');
    }

    
}
