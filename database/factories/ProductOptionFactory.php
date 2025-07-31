<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Option;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product_option>
 */
class ProductOptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::inRandomOrder()->first()->id_product,
            'option_id' => Option::inRandomOrder()->first()->id_option,
            'prix' => $this->faker->randomFloat(2, 5, 100),
        
        ];
    }
}
