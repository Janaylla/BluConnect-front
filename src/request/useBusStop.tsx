import { useQuery } from "react-query";
import { api } from "./axios";
interface QueryBusStop {
  search: string;
}
export interface BusStop {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}
const useBusStop = ({ search }: QueryBusStop) => {
  return useQuery(`busStop-${search}`, async (): Promise<BusStop[]> => {
    const response = await api.get("/bus-stops", {
      params: { 
        search,
        limit: 10,
        page: 1,
      },
    });
    return response.data;
  });
};
export default useBusStop;