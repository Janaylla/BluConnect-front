import { useMutation, useQueryClient } from "react-query";
import { api } from "../axios";
import { useToast } from "../../components/Toast/Toast";
import { TravelScheduleForm } from "../../pages/travelSchedule/travelSchedule.type";

export const useCreateTravelSchedule = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    async (data: TravelScheduleForm) => {
      const response = await api.post("/bus-stops", data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("busRoutes");
        toast({
          title: "Rota de ônibus criada com sucesso",
          message: "A rota de ônibus foi criada com sucesso",
          type: "success",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Erro ao criar rota de ônibus",
          message: error.response.data.message,
          type: "error",
        });
      },
    }
  );
};
