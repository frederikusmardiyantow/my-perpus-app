/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { useKembalikanBuku } from "../../hooks/usePengembalian";
import Loading from "../Loading";
import { ConvertToTimestampDBFormat } from "../../utils/ConvertToTimestampDBFormat";
import { useCustomer } from "../../hooks/useCustomer";

// eslint-disable-next-line react/prop-types
function KembalikanBukuModal({
  isOpen,
  onOpenChange,
  modalPlacement,
  dataPeminjaman,
}) {
  const init = {
    id_customer: "",
  };
  const [data, setData] = useState(init);
  const { kembalikan, isLoadKembali } = useKembalikanBuku(
    onOpenChange,
    setData,
    init
  );
  const { customer } = useCustomer();
console.log(dataPeminjaman);
  const handleSubmit = (e) => {
    e.preventDefault();

    kembalikan({
      id_peminjaman: dataPeminjaman.id,
      id_pengembali: data.id_customer,
      tgl_kembali: ConvertToTimestampDBFormat(new Date()),
    });
  };

  return (
    <>
      {isLoadKembali && <Loading />}
      <Modal
        isOpen={isOpen}
        placement={modalPlacement}
        onOpenChange={onOpenChange}
        className="rounded-md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Konfirmasi
              </ModalHeader>
              <ModalBody>
                <p>Yakin ingin kembalikan buku ini?</p>
                <div className="mt-3 border-2 border-gray-300 rounded-md p-3">
                  <p>Nama Peminjam: {dataPeminjaman?.peminjam?.nama}</p>
                  <p>Judul Buku: {dataPeminjaman?.buku?.judul}</p>
                  <p>Tgl. Peminjaman: {dataPeminjaman?.tgl_pinjam}</p>
                </div>
                <div>
                  <Select
                    value={data.id_customer}
                    onChange={(e) =>
                      setData({ ...data, id_customer: e.target.value })
                    }
                    variant="bordered"
                    label="Customer Pengembali"
                    className="w-full"
                  >
                    {customer?.data?.map((item) => (
                      <SelectItem key={item.id}>{item.nama}</SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  auto
                  flat
                  color="error"
                  onClick={onClose}
                  className="w-full"
                >
                  Tidak
                </Button>
                <Button
                  auto
                  color="danger"
                  isLoading={isLoadKembali}
                  onClick={handleSubmit}
                  className="w-full"
                >
                  Iya
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default KembalikanBukuModal;
