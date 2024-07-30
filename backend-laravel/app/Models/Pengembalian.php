<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengembalian extends Model
{
    protected $table = 'pengembalians';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id_peminjaman',
        'id_pengembali',
        'tgl_kembali',
    ];

    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class, 'id_peminjaman', 'id');
    }

    public function pengembali()
    {
        return $this->belongsTo(Customer::class, 'id_pengembali', 'id');
    }
}
