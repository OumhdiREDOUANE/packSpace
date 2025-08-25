<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Http\Resources\ImageProductResource;
use Illuminate\Http\Resources\Json\JsonResource;

class PanierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
{
    $firstOption = $this->productOptions->first();
    $product = $firstOption?->product;
    $image = $product?->images->first();

    // نجمع الخيارات حسب الـ proprieter
    $groupedByProprieter = $this->productOptions->groupBy(function ($productOption) {
        return $productOption->option->proprieter->id_proprieter;
    })->map(function ($options) {
        $first = $options->first();
        $proprieter = $first->option->proprieter;

        return [
            'id_proprieter' => $proprieter->id_proprieter,
            'name_proprieter' => $proprieter->name_proprieter,
            'options' =>  [
                    'id_option' => $first->option->id_option,
                    'name_option' => $first->option->name_option,
                    "id_ProductOption"=>$first->id_ProductOption
                ],
        ];
    })->values(); // important to reset numeric keys

    return [
        'id_orderProduct' => $this->id_orderProduct,
        'uuid'=>$this->uuid,

        'prix_total' => $this->productOptions->sum('prix'),

        'product' => [
            'id_product' => $product->id_product,
            'name_product' => $product->name_product,
            'image' => new ImageProductResource($image),
            'proprieter' => $groupedByProprieter
        ]
    ];
}
}