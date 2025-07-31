<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('panier_order_product', function (Blueprint $table) {
            $table->unsignedBigInteger('panier_id');
            $table->unsignedBigInteger('order_product_id');
        
            $table->foreign('panier_id')->references('id_panier')->on('paniers')->onDelete('cascade');
            $table->foreign('order_product_id')->references('id_orderProduct')->on('order_products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('panier_order_product');
    }
};
