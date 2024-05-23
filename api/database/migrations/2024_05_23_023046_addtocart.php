<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('addtocart', function (Blueprint $table) {
            $table->string('order_quantity')->default(1)->after('variation_option_id');
            $table->string('unit_price')->nullable()->after('order_quantity');
            $table->string('subtotal')->nullable()->after('unit_price');
        });
    }
    public function down(): void
    {
        Schema::table('addtocart', function (Blueprint $table) {
            $table->dropColumn('order_quantity');
            $table->dropColumn('unit_price');
            $table->dropColumn('subtotal');
        });
    }
};
