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
import { useCustomer } from "../../hooks/useCustomer";
import { ConvertDateFormat } from "../../utils/ConvertDateFormat";

function Customer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { customer, isLoad } = useCustomer();

  const columns = [
    {
      name: "NO ANGGOTA",
      key: "no_anggota",
    },
    {
      name: "NAMA",
      key: "nama",
    },
    {
      name: "TANGGAL LAHIR",
      key: "tgl_lahir",
    },
  ];

  return (
    <div className="p-5">
      <div className="font-bold text-2xl md:text-3xl uppercase mb-5 text-center">
        Daftar Customer
      </div>
      <div className="flex justify-end me-5 mb-3">
        <Button onPress={onOpen} color="success" className="rounded-md text-white font-semibold">
          Tambah Customer
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
          items={customer?.data || []}
          emptyContent={"Tidak ada data yang ditampilkan"}
        >
          {(item) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "tgl_lahir"
                    ? ConvertDateFormat(getKeyValue(item, columnKey))
                    : getKeyValue(item, columnKey)}
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
    </div>
  );
}

export default Customer;
