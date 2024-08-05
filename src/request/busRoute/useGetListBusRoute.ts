import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData } from "../../components/CompleteTable";
interface QueryBusRoute {
  search: string;
  page: number;
  limit: number;
}
export interface BusRoute {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
const useGetListBusRoute = ({ search, limit, page }: QueryBusRoute) => {
  return useQuery([`busRoute`, search], async (): Promise<OutputData<BusRoute>> => {
    const response = await api.get("/bus-routes", {
      params: {
        search,
        limit,
        page,
      },
    });
    return response.data;
  });
};
export default useGetListBusRoute;
