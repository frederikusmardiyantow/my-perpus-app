import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";
import { getPengembalianAll, kembalikanBuku } from "../services/apiPengembalian";

export const usePengembalian = () => {
  const {
    isLoading: isLoad,
    data: pengembalian,
    refetch,
  } = useQuery({
    queryKey: ["pengembalian"],
    queryFn: () => getPengembalianAll(),
    refetchOnMount: true,
  });

  return { isLoad, pengembalian, refetch };
};

export const useKembalikanBuku = (openModal, setData, init) => {
  const queryClient = useQueryClient();

  const {
    mutate: kembalikan,
    isLoading: isLoadKembali,
    error,
    failureReason,
  } = useMutation({
    mutationFn: (data) => kembalikanBuku(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["buku"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pengembalian"],
      });
      openModal(false);
      setData(init);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
  return {
    kembalikan,
    isLoadKembali,
    error,
    failureReason,
  };
};
