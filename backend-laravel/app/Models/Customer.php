<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends BaseModel
{
    protected $table = 'customers';
    protected $primaryKey = 'id';
    protected $fillable = [
        'no_anggota',
        'nama',
        'tgl_lahir',
    ];

    public function pengembalian()
    {
        return $this->hasMany(Pengembalian::class, 'id_pengembali', 'id');
    }

    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'id_peminjam', 'id');
    }
}
