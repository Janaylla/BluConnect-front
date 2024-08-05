import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData } from "../../components/CompleteTable";
import { Trip } from "../trip/useGetListTrip";
interface QueryTravelSchedule {
  search: string;
  page: number;
  limit: number;
}
export interface TravelSchedule {
  time: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  tripId: number;
  trip: Trip;
}
const useGetListTravelSchedule = ({ search, limit, page }: QueryTravelSchedule) => {
  return useQuery([`travelSchedule`, search], async (): Promise<OutputData<TravelSchedule>> => {
    const response = await api.get("/travel-schedule", {
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
