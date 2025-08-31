<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Proprieter;
use App\Models\ProductOption;
class Option extends Model
{
    /** @use HasFactory<\Database\Factories\OptionFactory> */
    use HasFactory;
    protected $primaryKey = 'id_option';
    

    protected $fillable = ['name_option', 'image_option',"description_option",'proprieter_id'];

    public function proprieter()
    {
        return $this->belongsTo(Proprieter::class, 'proprieter_id');
    }

    public function productOptions()
    {
        return $this->hasMany(ProductOption::class, 'option_id');
    }
}