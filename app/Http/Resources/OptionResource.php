<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        return [
            'id_option'=>$this->id_option,
            'name_option'=>$this->name_option,
            'prix_optionOfProduct'=>$this->prix,
            "image_option"=>$this->image_option,
        ];
    }
}
