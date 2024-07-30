<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    protected $table = 'peminjamens';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_peminjam',
        'id_buku',
        'tgl_pinjam',
        'harga_pinjam',
    ];

    public function pengembalian()
    {
        return $this->hasOne(Pengembalian::class, 'id_peminjaman', 'id');
    }

    public function peminjam()
    {
        return $this->belongsTo(Customer::class, 'id_peminjam', 'id');
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class, 'id_buku', 'id');
    }
}
