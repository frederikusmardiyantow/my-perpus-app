import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { useTambahPeminjaman } from "../../hooks/usePeminjaman";
import { useCustomer } from "../../hooks/useCustomer";
import { ConvertToTimestampDBFormat } from "../../utils/ConvertToTimestampDBFormat";

// eslint-disable-next-line react/prop-types
function AddPeminjaman({ isOpen, onOpenChange, modalPlacement, dataBuku }) {
  const { tambahData, isLoadTambah } = useTambahPeminjaman(onOpenChange);
  const { customer } = useCustomer();
  const [data, setData] = useState({
    id_customer: "",
    harga_pinjam: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    tambahData({
      id_buku: dataBuku?.id || "",
      id_peminjam: data.id_customer,
      harga_pinjam: data.harga_pinjam,
      tgl_pinjam: ConvertToTimestampDBFormat(new Date()),
    });
  };

  return (
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
              Tambah Peminjaman Buku
            </ModalHeader>
            <ModalBody>
              <form action="" className="flex flex-col gap-3">
                <div>
                  <Select
                    value={data.id_customer}
                    onChange={(e) =>
                      setData({ ...data, id_customer: e.target.value })
                    }
                    variant="bordered"
                    label="Customer"
                    className="w-full"
                  >
                    {customer?.data?.map((item) => (
                      <SelectItem key={item.id}>{item.nama}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <Input
                    value={data.harga_pinjam}
                    onChange={(e) =>
                      setData({ ...data, harga_pinjam: e.target.value })
                    }
                    name="harga_pinjam"
                    id="harga_pinjam"
                    type="text"
                    label="Harga Pinjam"
                    variant="bordered"
                    className="w-full"
                  />
                </div>
                <div className="mb-3 flex justify-center gap-3">
                  <Button
                    color="danger"
                    variant="light"
                    className="w-full"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isLoadTambah}
                    disabled={isLoadTambah}
                    color="primary"
                    onClick={handleSubmit}
                    className="w-full"
                  >
                    Simpan
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddPeminjaman;
