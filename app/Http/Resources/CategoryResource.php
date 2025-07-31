<?php

namespace App\Http\Resources;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name_categorie'=>$this->name_categorie,
            'products'=>ProductResource::collection($this->whenLoaded('products')),
        ];
    }
}
