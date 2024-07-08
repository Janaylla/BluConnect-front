import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData } from "../../components/CompleteTable";
import { BusRoute } from "../busRoute/useBusRoute";
interface QueryTrip {
  search: string;
  page: number;
  limit: number;
}
export interface Trip {
  id: number;
  code: string;
  busRoutes: BusRoute[];
}
const useGetListTrip = ({ search, limit, page }: QueryTrip) => {
  return useQuery([`trip`, search], async (): Promise<OutputData<Trip>> => {
    const response = await api.get("/trips", {
      params: {
        search,
        limit,
        page,
      },
    });
    return response.data;
  });
};
export default useGetListTrip;
