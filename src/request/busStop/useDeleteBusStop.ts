import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";

export const useDeleteBusStop = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      await api.delete(`/bus-stops/${id}`);
    },
    {
        onError: (error: any) => {
            toast({
                title: "Erro ao deletar ponto de ônibus",
                message: error.response.data.message,
                type: "error",
            });
            },
        onSuccess: () => {
            queryClient.invalidateQueries("busStop");
            toast({
                title: "Ponto de ônibus deletado com sucesso",
                message: "O ponto de ônibus foi deletado com sucesso",
                type: "success",
            });
        }
    }
  );
};
