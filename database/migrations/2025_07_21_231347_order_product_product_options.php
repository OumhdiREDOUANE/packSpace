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
        Schema::create('order_product_product_options', function (Blueprint $table) {
    $table->unsignedBigInteger('order_product_id');
    $table->unsignedBigInteger('product_option_id');
 
    $table->foreign('order_product_id')->references('id_orderProduct')->on('order_products')->onDelete('cascade');
    $table->foreign('product_option_id')->references('id_ProductOption')->on('product_options')->onDelete('cascade');

    
    
    $table->timestamps();
    }
    
);
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_product_product_options');
    }
};
