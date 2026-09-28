<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->string('headline');
            $table->text('bio')->nullable();
            $table->string('photo')->nullable();
            $table->string('cv_url')->nullable();
            $table->string('location')->nullable();
            $table->string('availability')->default('available');
            $table->string('phone')->nullable();
            $table->string('email_public')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('profiles'); }
};
