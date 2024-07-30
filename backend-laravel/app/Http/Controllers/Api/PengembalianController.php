<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Peminjaman;
use App\Models\Pengembalian;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class PengembalianController extends Controller
{
    public function index()
    {
        $pengembalian = Pengembalian::with(['peminjaman.buku', 'peminjaman.peminjam', 'pengembali'])->get();

        return response()->json([
            'success' => true,
            'message' => 'Success',
            'data' => $pengembalian
        ], 200);
    }

    public function pengembalian(Request $request, string $id)
    {
        $data = $request->all();

        $pengembalian = Pengembalian::with(['peminjaman.buku'])->find($id);
        if (!$pengembalian) {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian tidak ditemukan'
            ], 404);
        }

        $validate = Validator::make($data, [
            'id_pengembali' => 'required',
            'tgl_kembali' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal! Silahkan Periksa Kembali!',
                'error' => $validate->errors()
            ], 400);
        }

        if($pengembalian->tgl_kembali != null) {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian sudah dilakukan'
            ], 403);
        }

        $pengembali = Customer::find($data['id_pengembali']);
        if (!$pengembali) {
            return response()->json([
                'success' => false,
                'message' => 'Customer Pengembali tidak ditemukan'
            ], 404);
        }

        if (Carbon::parse($data['tgl_kembali'])->format('Y-m-d') < Carbon::parse($pengembalian['peminjaman']->tgl_pinjam)->format('Y-m-d')) {
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian harus setelah peminjaman'
            ], 403);
        }

        DB::beginTransaction();
        try {
            $pengembalian->id_pengembali = $data['id_pengembali'];
            $pengembalian->tgl_kembali = $data['tgl_kembali'];
            $pengembalian->save();

            $pengembalian['peminjaman']['buku']->stok += 1;
            $pengembalian['peminjaman']['buku']->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Pengembalian berhasil!',
                'data' => $pengembalian
            ], 200);

        } catch (Exception $th) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Pengembalian gagal! Kesalahan server!',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
