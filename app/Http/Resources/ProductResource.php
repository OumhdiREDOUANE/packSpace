<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'products'=>ProductResource::collection($this->whenLoaded('products')),
            'id_product'    => $this->id_product,
            'name_product'  => $this->name_product,
        
        ];
    }
}
