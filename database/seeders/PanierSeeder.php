<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Panier;
use App\Models\OrderProduct;


class PanierSeeder extends Seeder
{
    public function run()
    {
        $orderProductIds = OrderProduct::pluck('id_orderProduct')->toArray();

        foreach ($orderProductIds as $id) {
            Panier::create([
                'prix_tatol' => fake()->randomFloat(2, 10, 500),
                'orderProduct_id' => $id,
            ]);
        }
}
}

