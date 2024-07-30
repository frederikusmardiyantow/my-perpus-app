<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Buku;
use App\Models\Customer;
use App\Models\Peminjaman;
use App\Models\Pengembalian;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class PeminjamanController extends Controller
{
    public function index()
    {
        $data = Peminjaman::with(['buku', 'peminjam', 'pengembalian.pengembali'])->get();
        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $data
        ], 200);
    }

    public function peminjaman(Request $request)
    {
        $data = $request->all();

        $validate = Validator::make($data, [
            'id_buku' => 'required',
            'id_peminjam' => 'required',
            'tgl_pinjam' => 'required',
            'harga_pinjam' => 'required|numeric',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal! Silahkan Periksa Kembali!',
                'error' => $validate->errors()
            ], 400);
        }

        $buku = Buku::find($data['id_buku']);
        $peminjam = Customer::find($data['id_peminjam']);
        if (!$buku) {
            return response()->json([
                'status' => false,
                'message' => 'Buku Tidak ditemukan'
            ], 404);
        }
        if (!$peminjam) {
            return response()->json([
                'status' => false,
                'message' => 'Peminjam Tidak ditemukan'
            ], 404);
        }
        if (Carbon::parse($data['tgl_pinjam'])->format('Y-m-d') < Carbon::now()->format('Y-m-d')) {
            return response()->json([
                'status' => false,
                'message' => 'Tgl Pinjam Tidak Valid! Tidak boleh kurang dari hari ini!'
            ], 403);
        }

        if($buku->stok < 1) {
            return response()->json([
                'status' => false,
                'message' => 'Stok Buku Tidak Cukup!'
            ], 403);
        }

        DB::beginTransaction();
        try {
            $peminjaman = Peminjaman::create($data); // buat peminjaman

            $buku->stok = $buku->stok - 1;
            $buku->save(); //simpan perubahan stok buku

            Pengembalian::create([
                'id_peminjaman' => $peminjaman->id,
            ]); // buat pengembalian
            
            DB::commit();
    
            return response()->json([
                'status' => true,
                'message' => 'Peminjaman Berhasil.. Stok buku menjadi '.$buku->stok,
                'data' => $peminjaman
            ], 200);
            
        } catch (Exception $th) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Peminjaman Gagal! Kesalahan server!',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
