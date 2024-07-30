<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Buku;
use Illuminate\Http\Request;
use Validator;

class BukuController extends Controller
{
    public function index()
    {
        $bukus = Buku::all();
        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $bukus
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        
        $validate = Validator::make($data, [
            'judul' => 'required',
            'penerbit' => 'required',
            'jumlah_halaman' => 'required',
            'stok' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validate->errors()
            ], 400);
        }

        $buku = Buku::create($data);
        if(!$buku) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal! Kesalahan Server!'
            ], 500);
        }
        
        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $buku
        ]);
    }
}
