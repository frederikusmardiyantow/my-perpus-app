import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useTambahBuku } from "../../hooks/useBuku";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function AddUpdModal({ isOpen, onOpenChange, modalPlacement }) {
  const { tambahData, isLoadTambah } = useTambahBuku(onOpenChange);
  const [data, setData] = useState({
    judul: "",
    penerbit: "",
    jumlah_halaman: "",
    stok: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    tambahData({
      judul: data.judul || "",
      penerbit: data.penerbit || "",
      jumlah_halaman: data.jumlah_halaman || "",
      stok: data.stok || "",
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
              Tambah Data
            </ModalHeader>
            <ModalBody>
              <form action="" className="flex flex-col gap-3">
                <div>
                  <Input
                    value={data.judul}
                    onChange={(e) =>
                      setData({ ...data, judul: e.target.value })
                    }
                    name="judul"
                    id="judul"
                    type="text"
                    label="Judul"
                    variant="bordered"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    value={data.penerbit}
                    onChange={(e) =>
                      setData({ ...data, penerbit: e.target.value })
                    }
                    name="penerbit"
                    id="penerbit"
                    type="text"
                    label="Penerbit"
                    variant="bordered"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-3">
                  <Input
                    value={data.jumlah_halaman}
                    onChange={(e) =>
                      setData({ ...data, jumlah_halaman: e.target.value })
                    }
                    name="jumlah_halaman"
                    id="jumlah_halaman"
                    type="text"
                    label="Jumlah Halaman"
                    variant="bordered"
                    className="w-full"
                  />
                  <Input
                    value={data.stok}
                    onChange={(e) => setData({ ...data, stok: e.target.value })}
                    name="stok"
                    id="stok"
                    type="text"
                    label="Stok"
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

export default AddUpdModal;
