import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData } from "../../components/CompleteTable";
interface QueryBusStop {
  search: string;
  page: number;
  limit: number;
}
export interface BusStop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
const useGetBusStop = ({ search, limit, page }: QueryBusStop) => {
  return useQuery([`busStop`, search], async (): Promise<OutputData<BusStop>> => {
    const response = await api.get("/bus-stops", {
      params: {
        search,
        limit,
        page,
      },
    });
    return response.data;
  });
};
export default useGetBusStop;
