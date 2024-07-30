<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Validator;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $validate = Validator::make($data, [
            'no_anggota' => 'required',
            'nama' => 'required',
            'tgl_lahir' => 'required|date',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal! Silahkan Periksa Kembali!',
                'error' => $validate->errors()
            ], 400);
        }

        $cekData = Customer::where('no_anggota', $data['no_anggota'])->first();
        if($cekData) {
            return response()->json([
                'status' => false,
                'message' => 'No Anggota sudah terdaftar'
            ], 400);
        }

        $customer = Customer::create($request->all());
        if(!$customer) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal! Kesalahan Server!'
            ], 500);
        }

        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $customer
        ], 200);
    }
}
