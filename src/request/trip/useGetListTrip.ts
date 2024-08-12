import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData, QuerySearch } from "../../components/CompleteTable";
import { BusRoute } from "../busRoute/useBusRoute";

export interface Trip {
  id: number;
  code: string;
  busRoutes: BusRoute[];
}
const useGetListTrip = ({ search, limit, page, order = '', searchs = {} }: QuerySearch) => {
  return useQuery([`trip`, search, limit, page, order, Object.values(searchs)], async (): Promise<OutputData<Trip>> => {
    const response = await api.get("/trips", {
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
export default useGetListTrip;
