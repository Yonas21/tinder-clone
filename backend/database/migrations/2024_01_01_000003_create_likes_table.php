<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->enum('action', ['like', 'dislike'])->default('like');
            $table->timestamps();
            $table->unique(['user_id', 'person_id']);
            $table->index('person_id');
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('likes');
    }
};

