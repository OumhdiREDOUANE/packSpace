<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryDashboardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id_categorie' => $this->id_categorie,
            'name_categorie' => $this->name_categorie,
            'description_categorie' => $this->description_categorie,
            'url' => $this->url,
           'products_count'=> $this->products_count, // جاي من withCount()
        
        ];
    }
}
