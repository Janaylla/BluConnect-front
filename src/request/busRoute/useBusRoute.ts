import { useQuery } from "react-query";
import { api } from "../axios";
import { BusStop } from "../busStop/useGetListBusStop";
interface QueryBusRoute {
  from_id: number;
  to_id: number;
}
export interface BusRoute { 
  id: number;
  index: number;
  tripId: string;
  startBusStop: BusStop;
  startBusStopId: number;
  endBusStop: BusStop;
  endBusStopId: number
}
const useBusRoute = ({ from_id, to_id }: QueryBusRoute) => {
  return useQuery(`busRoute-${from_id}-${to_id}`, async (): Promise<BusRoute[]> => {
    const response = await api.get("/bus-routes/possible-routes", {
      params: { from_id, to_id },
    });
    return response.data;
  });
};
export default useBusRoute;
