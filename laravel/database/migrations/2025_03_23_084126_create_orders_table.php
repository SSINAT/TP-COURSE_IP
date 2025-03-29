<?php

use App\Models\Order;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->decimal('total_price', 10, 2);
            $table->bigInteger('customer_id')->unsigned();
            $table->timestamp('order_date')->nullable();
            $table->timestamps();

            $table->foreign('customer_id')->references('id')->on('customers');

        });
    }


    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
