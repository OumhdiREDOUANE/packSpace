<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Proprieter;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Option>
 */
class OptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_option' => $this->faker->word,
            'image_option' => $this->faker->imageUrl(640, 480, 'option', true),
            'proprieter_id' => Proprieter::inRandomOrder()->first()->id_proprieter,
        ];
    }
}
