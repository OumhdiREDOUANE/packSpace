<?php

namespace App\Http\Resources;
use App\Http\Resources\ImageProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductsOfCategorieResource extends JsonResource
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
                'image_product' => ImageProductResource::collection($this->whenLoaded('images')),
            
        ];
    }
}
