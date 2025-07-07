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
        Schema::table('messages', function (Blueprint $table) {
            // Drop foreign key constraint if it exists
            try {
                $table->dropForeign(['user_id']);
            } catch (\Throwable $e) {
                // Ignore if foreign key does not exist
            }
            // Drop the column if it exists
            if (Schema::hasColumn('messages', 'user_id')) {
                $table->dropColumn('user_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable();
            // If you want to restore the foreign key, uncomment below and adjust as needed:
            // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
