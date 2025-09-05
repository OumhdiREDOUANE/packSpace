<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ImageProductResource;
class OrderDashboardResource extends JsonResource
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
                'id_proprieter'   => $proprieter->id_proprieter,
                'name_proprieter' => $proprieter->name_proprieter,
                'options' => [
                    'id_option'        => $first->option->id_option,
                    'name_option'      => $first->option->name_option,
                    'id_ProductOption' => $first->id_ProductOption,
                    'prix'             => $first->prix,
                ],
            ];
        })->values(); // important to reset numeric keys

        return [
            'id_orderProduct' => $this->id_orderProduct,
            'uuid'            => $this->uuid,
            'status'          => $this->status,
            'created_at'      => $this->created_at->toDateTimeString(),

            // معلومات user
            'user' => $this->user ? [
                'id_user' => $this->user->id_user,
                'name'    => $this->user->nomComplet,
                'email'   => $this->user->email,
                 'numero_telephone'   => $this->user->numero_telephone,
            ] : null,

            // معلومات المنتج
            'prix_total' => $this->productOptions->sum('prix'),
            'product' => [
                'id_product' => $product?->id_product,
                'name_product' => $product?->name_product,
                'image' => new ImageProductResource($image),
                'proprieter' => $groupedByProprieter
            ],
        ];
    }
}
