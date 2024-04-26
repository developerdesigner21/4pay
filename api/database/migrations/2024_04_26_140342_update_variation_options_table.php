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
        Schema::table('variation_options', function (Blueprint $table) {
            $table->string('height')->nullable()->after('sku');
            $table->string('width')->nullable()->after('height');
            $table->string('length')->nullable()->after('width');
            $table->string('weight')->nullable()->after('length');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('variation_options', function (Blueprint $table) {
            $table->dropColumn('height');
            $table->dropColumn('width');
            $table->dropColumn('length');
            $table->dropColumn('weight');
        });
    }
};
