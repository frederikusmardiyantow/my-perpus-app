import { useMutation, useQuery, useQueryClient } from "react-query";
import { addPeminjaman, getPeminjamanAll } from "../services/apiPeminjaman";
import { toast } from "sonner";

export const usePeminjaman = () => {
  const {
    isLoading: isLoad,
    data: peminjaman,
    refetch,
  } = useQuery({
    queryKey: ["peminjaman"],
    queryFn: () => getPeminjamanAll(),
    refetchOnMount: true,
  });

  return { isLoad, peminjaman, refetch };
};

export const useTambahPeminjaman = (openModal) => {
  const queryClient = useQueryClient();

  const {
    mutate: tambahData,
    isLoading: isLoadTambah,
    error,
    failureReason,
  } = useMutation({
    mutationFn: (data) => addPeminjaman(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["peminjaman"],
      });
      queryClient.invalidateQueries({
        queryKey: ["buku"],
      });
      openModal(false);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return {
    tambahData,
    isLoadTambah,
    error,
    failureReason,
  };
};
