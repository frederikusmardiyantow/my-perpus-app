import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import { ConvertDateFormat } from "../../utils/ConvertDateFormat";
import { usePeminjaman } from "../../hooks/usePeminjaman";
import KembalikanBukuModal from "./KembalikanBukuModal";
import { useState } from "react";

function Peminjaman() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { peminjaman, isLoad } = usePeminjaman();
  const [dataPeminjaman, setDataPeminjaman] = useState({});
  console.log(peminjaman);
  const columns = [
    {
      name: "CUSTOMER PEMINJAM",
      key: "peminjam",
    },
    {
      name: "JUDUL BUKU",
      key: "buku",
    },
    {
      name: "HARGA PINJAM",
      key: "harga_pinjam",
    },
    {
      name: "TANGGAL PINJAM",
      key: "tgl_pinjam",
    },
    {
      name: "TANGGAL KEMBALI",
      key: "pengembalian",
    },
    {
      name: "CUSTOMER PENGEMBALI",
      key: "pengembalian.pengembali",
    },
    {
      name: "AKSI",
      key: "action",
    },
  ];

  return (
    <div className="p-5">
      <div className="font-bold text-2xl md:text-3xl uppercase mb-5 text-center">
        Daftar Peminjaman Buku
      </div>
      <Table
        removeWrapper
        aria-label="Example static collection table"
        className="lg:max-w-[75%] mx-auto"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoad}
          loadingContent={<Spinner label="Loading..." />}
          items={peminjaman?.data || []}
          emptyContent={"Tidak ada data yang ditampilkan"}
        >
          {(item) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "tgl_pinjam" ? (
                    ConvertDateFormat(getKeyValue(item, columnKey))
                  ) : columnKey === "action" ? (
                    item.pengembalian.tgl_kembali !== null ? (
                      <div>-</div>
                    ) : (
                      <Button
                        color="primary"
                        className="rounded-md h-8"
                        onPress={() => {
                          setDataPeminjaman(item);
                          onOpen();
                        }}
                      >
                        Kembalikan
                      </Button>
                    )
                  ) : columnKey === "buku" ? (
                    item.buku.judul
                  ) : columnKey === "peminjam" ? (
                    item.peminjam.nama
                  ) : columnKey === "pengembalian.pengembali" ? (
                    item.pengembalian.id_pengembali ? (
                      item.pengembalian.pengembali.nama
                    ) : (
                      "-"
                    )
                  ) : columnKey === "pengembalian" ? (
                    getKeyValue(item, columnKey).tgl_kembali ? (
                      ConvertDateFormat(
                        getKeyValue(item, columnKey).tgl_kembali
                      )
                    ) : (
                      "-"
                    )
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <KembalikanBukuModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalPlacement="auto"
        dataPeminjaman={dataPeminjaman}
      />
    </div>
  );
}

export default Peminjaman;
