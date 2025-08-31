<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id_user' => $this->id_user,
            'nomComplet' => $this->nomComplet,
            'numero_telephone' => $this->numero_telephone,
            'email' => $this->email,
            'role' => $this->role,
            
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
