<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('profiles', 'phone')) {
            Schema::table('profiles', function (Blueprint $table) {
                $table->string('phone')->nullable();
            });
        }

        if (!Schema::hasColumn('profiles', 'email')) {
            Schema::table('profiles', function (Blueprint $table) {
                $table->string('email')->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('profiles', 'phone')) {
            Schema::table('profiles', function (Blueprint $table) {
                $table->dropColumn('phone');
            });
        }

        if (Schema::hasColumn('profiles', 'email')) {
            Schema::table('profiles', function (Blueprint $table) {
                $table->dropColumn('email');
            });
        }
    }
};
