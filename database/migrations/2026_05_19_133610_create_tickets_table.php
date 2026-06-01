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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            // $table->enum('status', ['open', 'in_progress', 'resolved', 'closed']);
            // $table->enum('priority', ['low', 'medium', 'high']);
            $table->string('status')->default('open');;
            $table->string('priority')->default('low');
            $table->foreignId('user_submitter_id');
            $table->foreignId('user_asignee_id')->nullable();
            $table->foreignId('category_ids')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
