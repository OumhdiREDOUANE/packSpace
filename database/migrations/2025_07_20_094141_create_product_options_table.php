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
        Schema::create('product_options', function (Blueprint $table) {
            $table->bigIncrements('id_ProductOption');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')
                  ->references('id_product')
                  ->on('products')
                  ->onDelete('cascade');
            
            $table->unsignedBigInteger('option_id');
            $table->foreign('option_id')
                  ->references('id_option')
                  ->on('options')
                  ->onDelete('cascade');
            
            $table->decimal('prix', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_options');
    }
};
