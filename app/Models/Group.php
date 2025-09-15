<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categorie;
use App\Models\Product;

class Group extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_group';
    protected $fillable = ['name_group', 'description_group', 'categorie_id'];

    // كل مجموعة تنتمي إلى صنف
  public function category()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id', 'id_categorie');
    }
    // كل مجموعة تحتوي على منتجات
    public function products()
    {
        return $this->hasMany(Product::class, 'group_id', 'id_group');
    }
}
