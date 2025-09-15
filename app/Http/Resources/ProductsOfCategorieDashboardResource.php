<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductsOfCategorieDashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
      
        
            return [
                'id_product'    => $this->id_product,
                'name_product'  => $this->name_product,
                'description_product' => $this->description_product,
                'categorie_id'  => $this->categorie_id,
                'group_id'  => $this->group_id, // عشان يتطابق مع الـ interface
                'categorie'     => $this->categorie?->name_categorie,
                'group'     => $this->group?->name_group,

                'images'        => ImageProductResource::collection($this->whenLoaded('images')), // غيرت الاسم images
            ];
                
            
        
    }
}
