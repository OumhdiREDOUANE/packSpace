<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PanierValider;
use App\Models\Panier;
use App\Models\User;
;

class PanierValiderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orderProductIds = Panier::pluck('id_panier')->toArray();

    foreach ($orderProductIds as $id) {
        PanierValider::create([
            'user_id' => User::inRandomOrder()->first()->id_user,
            
            'prix_totalValider' =>fake()->randomFloat(2, 50, 1000),
            'panier_id' => $id,
        ]);
    }
    }
}
