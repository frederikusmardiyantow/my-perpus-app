<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengembalians', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_peminjaman');
            $table->foreign('id_peminjaman', 'fk_pinjam_kembali')->references('id')->on('peminjamens')->cascadeOnUpdate()->cascadeOnDelete();
            $table->unsignedBigInteger('id_pengembali')->nullable();
            $table->foreign('id_pengembali', 'fk_cust_kembali')->references('id')->on('customers')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamp('tgl_kembali')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengembalians');
    }
};
