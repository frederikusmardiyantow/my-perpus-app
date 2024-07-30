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
import AddUpdModal from "./AddUpdModal";
import { useBuku } from "../../hooks/useBuku";
import AddPeminjaman from "./AddPeminjaman";
import { useState } from "react";

function Buku() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isOpenPinjam, isOpenChangePinjam] = useState();
  const { buku, isLoad } = useBuku();
  const [dataBuku, setDataBuku] = useState({});

  const columns = [
    {
      name: "JUDUL",
      key: "judul",
    },
    {
      name: "PENERBIT",
      key: "penerbit",
    },
    {
      name: "JUMLAH HALAMAN",
      key: "jumlah_halaman",
    },
    {
      name: "STOK",
      key: "stok",
    },
    {
      name: "AKSI",
      key: "action",
    },
  ];

  return (
    <div className="p-5">
      <div className="font-bold text-2xl md:text-3xl uppercase mb-5 text-center">
        Daftar Buku
      </div>
      <div className="flex justify-end me-5 mb-3">
        <Button
          onPress={onOpen}
          color="success"
          className="rounded-md text-white font-semibold"
        >
          Tambah Buku
        </Button>
      </div>
      <Table
        removeWrapper
        aria-label="Example static collection table"
        className="lg:max-w-[50%] mx-auto"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoad}
          loadingContent={<Spinner label="Loading..." />}
          items={buku?.data || []}
          emptyContent={"Tidak ada data yang ditampilkan"}
        >
          {(item) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "action" ? (
                    <Button
                      isDisabled={item?.stok === 0}
                      color="primary"
                      className="rounded-md h-8"
                      onClick={() => (
                        setDataBuku(item), isOpenChangePinjam(true)
                      )}
                    >
                      Pinjam
                    </Button>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddUpdModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalPlacement="auto"
      />
      <AddPeminjaman
        isOpen={isOpenPinjam}
        onOpenChange={isOpenChangePinjam}
        modalPlacement="auto"
        dataBuku={dataBuku}
      />
    </div>
  );
}

export default Buku;
