import { useMutation, useQuery, useQueryClient } from "react-query";
import { addBuku, getBukuAll } from "../services/apiBuku";
import { toast } from "sonner";

export const useBuku = () => {
  const {
    isLoading: isLoad,
    data: buku,
    refetch,
  } = useQuery({
    queryKey: ["buku"],
    queryFn: () => getBukuAll(),
    refetchOnMount: true,
  });

  return { isLoad, buku, refetch };
};

export const useTambahBuku = (openModal) => {
  const queryClient = useQueryClient();

  const {
    mutate: tambahData,
    isLoading: isLoadTambah,
    error,
    failureReason,
  } = useMutation({
    mutationFn: (data) => addBuku(data),
    onSuccess: (data) => {
      toast.success(data.message);
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
