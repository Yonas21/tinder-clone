<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notification_sent', function (Blueprint $table) {
            $table->id();
            $table->foreignId('person_id')->constrained()->onDelete('cascade');
            $table->integer('like_count');
            $table->timestamp('sent_at');
            $table->timestamps();
            $table->index('person_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification_sent');
    }
};

