import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData, QuerySearch } from "../../components/CompleteTable";

export interface BusRoute {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
const useGetListBusRoute = ({ search, limit, page, order = '', searchs = {} }: QuerySearch) => {
  return useQuery([`busRoute`, search, limit, page, order, Object.values(search)], async (): Promise<OutputData<BusRoute>> => {
    const response = await api.get("/bus-routes", {
      params: {
        search,
        limit,
        page,
        order,
        ...searchs
      },
    });
    return response.data;
  });
};
export default useGetListBusRoute;
