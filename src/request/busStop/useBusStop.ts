import { useQuery } from "react-query";
import { api } from "../axios";
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
const useBusStop = ({ search, limit, page }: QueryBusStop) => {
  return useQuery(`busStop-${search}`, async (): Promise<BusStop[]> => {
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
export default useBusStop;
