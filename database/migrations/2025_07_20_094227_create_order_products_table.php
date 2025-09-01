<?php

// database/migrations/xxxx_xx_xx_create_order_products_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderProductsTable extends Migration
{
    public function up()
    {
        Schema::create('order_products', function (Blueprint $table) {
            $table->bigIncrements('id_orderProduct');
             
            $table->uuid('uuid')->unique();
                  $table->string('session_user');
                  $table->foreignId('user_id')
                  ->nullable()
                  ->references('id_user')
                  ->on('users')
                    ->onDelete('cascade');
            $table->enum('status', ['Not Registered', 'Registered', 'Validated'])
                  ->default('Not Registered');
            $table->decimal('prix_orderProduct', 10, 2);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('order_products');
    }
}

