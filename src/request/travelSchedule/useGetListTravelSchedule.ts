import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData } from "../../components/CompleteTable";
interface QueryTravelSchedule {
  search: string;
  page: number;
  limit: number;
}
export interface TravelSchedule {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
const useGetListTravelSchedule = ({ search, limit, page }: QueryTravelSchedule) => {
  return useQuery([`travelSchedule`, search], async (): Promise<OutputData<TravelSchedule>> => {
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
export default useGetListTravelSchedule;
