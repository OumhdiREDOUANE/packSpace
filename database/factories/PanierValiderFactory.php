<?php

namespace Database\Factories;
use App\Models\User;
use App\Models\Panier;
use Illuminate\Database\Eloquent\Factories\Factory;

class PanierValiderFactory extends Factory
{
  

    public function definition(): array
    {
        return [
            'panier_id' => Panier::inRandomOrder()->first()->id_panier,
            'user_id' => User::inRandomOrder()->first()->id_user,
            'prix_totalValider' => $this->faker->randomFloat(2, 50, 1000),
        ];
    }
}