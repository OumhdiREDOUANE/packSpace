<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ProductOption;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order_product>
 */
class OrderProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ProductOption_id' => ProductOption::inRandomOrder()->first()->id_ProductOption,
        ];
    }
}
