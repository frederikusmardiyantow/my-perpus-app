<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends BaseModel
{
    protected $table = 'bukus';
    protected $primaryKey = 'id';
    protected $fillable = [
        'judul',
        'penerbit',
        'jumlah_halaman',
        'stok',
    ];

    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'id_buku', 'id');
    }
}
