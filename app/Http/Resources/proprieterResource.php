<?php

namespace App\Http\Resources;
use App\Http\Resources\OptionResource;
use App\Models\Proprieter;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class proprieterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        return [
           'id_proprieter' => $this->resource['proprieter']->id_proprieter,
            'name_proprieter' => $this->resource['proprieter']->name_proprieter,
           'options' => OptionResource::collection($this->resource['options']),
        ];
    }
}
