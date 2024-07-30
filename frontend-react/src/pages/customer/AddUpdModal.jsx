import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { useTambahCustomer } from "../../hooks/useCustomer";

// eslint-disable-next-line react/prop-types
function AddUpdModal({ isOpen, onOpenChange, modalPlacement }) {
  const init = {
    no_anggota: "",
    nama: "",
    tgl_lahir: "",
  };
  const [data, setData] = useState(init);
  const { tambahData, isLoadTambah } = useTambahCustomer(
    onOpenChange,
    setData,
    init
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    tambahData({
      no_anggota: data.no_anggota || "",
      nama: data.nama || "",
      tgl_lahir: data.tgl_lahir || "",
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
                    value={data.no_anggota}
                    onChange={(e) =>
                      setData({ ...data, no_anggota: e.target.value })
                    }
                    name="no_anggota"
                    id="no_anggota"
                    type="text"
                    label="No Anggota"
                    variant="bordered"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    value={data.nama}
                    onChange={(e) => setData({ ...data, nama: e.target.value })}
                    name="nama"
                    id="nama"
                    type="text"
                    label="Nama"
                    variant="bordered"
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    value={data.tgl_lahir}
                    onChange={(e) =>
                      setData({ ...data, tgl_lahir: e.target.value })
                    }
                    name="tgl_lahir"
                    id="tgl_lahir"
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    label="Tanggal Lahir"
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
