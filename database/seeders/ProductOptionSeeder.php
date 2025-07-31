<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductOption;

class ProductOptionSeeder extends Seeder
{
    public function run()
    {
        ProductOption::factory(5)->create();
    }
}
