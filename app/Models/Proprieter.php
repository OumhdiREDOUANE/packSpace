<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Option;
class Proprieter extends Model
{
    /** @use HasFactory<\Database\Factories\ProprieterFactory> */
    use HasFactory;
    protected $primaryKey = 'id_proprieter';
    

    protected $fillable = ['name_proprieter',"description_proprieter"];

    public function options()
    {
        return $this->hasMany(Option::class, 'proprieter_id');
    }
}
