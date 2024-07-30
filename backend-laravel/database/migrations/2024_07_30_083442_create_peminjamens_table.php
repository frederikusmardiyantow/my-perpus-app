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
        Schema::create('peminjamens', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_peminjam');
            $table->foreign('id_peminjam', 'fk_customer_pinjam')->references('id')->on('customers')->cascadeOnUpdate()->cascadeOnDelete();
            $table->unsignedBigInteger('id_buku');
            $table->foreign('id_buku', 'fk_buku_pinjam')->references('id')->on('bukus')->cascadeOnUpdate()->cascadeOnDelete();
            $table->float('harga_pinjam');
            $table->timestamp('tgl_pinjam')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjamens');
    }
};
