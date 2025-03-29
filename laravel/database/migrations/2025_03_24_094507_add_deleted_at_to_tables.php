<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->softDeletes(); 
        });

        Schema::table('customers', function (Blueprint $table) {
            $table->softDeletes(); 
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->softDeletes(); 
        });

        Schema::table('products', function (Blueprint $table) {
            $table->softDeletes(); 
        });

        Schema::table('carts', function (Blueprint $table) {
            $table->softDeletes(); 
        });

        Schema::table('order_products', function (Blueprint $table) {
            $table->softDeletes(); 
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->softDeletes(); 
        });

        Schema::table('wishlists', function (Blueprint $table) {
            $table->softDeletes(); 
        });
    }

 
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('customers', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('carts', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('order_product', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });

        Schema::table('wishlists', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
