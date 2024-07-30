import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";
import { addCustomer, getCustomerAll } from "../services/apiCustomer";

export const useCustomer = () => {
  const {
    isLoading: isLoad,
    data: customer,
    refetch,
  } = useQuery({
    queryKey: ["customer"],
    queryFn: () => getCustomerAll(),
    refetchOnMount: true,
  });

  return { isLoad, customer, refetch };
};

export const useTambahCustomer = (openModal, setData, init) => {
  const queryClient = useQueryClient();

  const {
    mutate: tambahData,
    isLoading: isLoadTambah,
    error,
    failureReason,
  } = useMutation({
    mutationFn: (data) => addCustomer(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["customer"],
      });
      openModal(false);
      setData(init);
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
