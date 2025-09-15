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
        Schema::create('groups', function (Blueprint $table) {
           $table->id('id_group');
    $table->string('name_group');
    $table->text('description_group')->nullable();
    $table->unsignedBigInteger('categorie_id');
    $table->foreign('categorie_id')->references('id_categorie')->on('categories')->onDelete('cascade');
    $table->timestamps();
    }
);
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
