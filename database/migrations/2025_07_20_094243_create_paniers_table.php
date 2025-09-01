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
        Schema::create('paniers', function (Blueprint $table) {
            $table->bigIncrements('id_panier');

            $table->unsignedBigInteger('user_id');
    $table->foreign('user_id')->references('id_user')->on('users')->onDelete('cascade');
    $table->enum('status', ['Pending', 'Completed', 'Delivered', 'Cancelled'])
    ->default('Pending');
    
    $table->decimal("prix_panier",8,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paniers');
    }
};
