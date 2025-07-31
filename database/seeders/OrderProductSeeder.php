<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\OrderProduct;
use App\Models\ProductOption;


class OrderProductSeeder extends Seeder
{
    public function run()
    {
        $productOptionIds = ProductOption::pluck('id_ProductOption')->toArray();

        foreach ($productOptionIds as $id) {
            OrderProduct::factory()->create([
                'ProductOption_id' => $id,
            ]);
    }
}
}

