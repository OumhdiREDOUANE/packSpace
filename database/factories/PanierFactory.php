<?php

namespace Database\Factories;

use App\Models\OrderProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Panier>
 */
class PanierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'prix_tatol' => $this->faker->randomFloat(2, 10, 500),
            'orderProduct_id' => OrderProduct::inRandomOrder()->first()->id_orderProduct,
        ];
    }
}
