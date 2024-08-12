import { useQuery } from "react-query";
import { api } from "../axios";
import { OutputData, QuerySearch } from "../../components/CompleteTable";

export interface BusStop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
const useGetListBusStop = ({ search, limit, page, order = '', searchs = {} }: QuerySearch) => {
  return useQuery([`busStop`, search, limit, page, order, Object.values(searchs)], async (): Promise<OutputData<BusStop>> => {
    const response = await api.get("/bus-stops", {
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
export default useGetListBusStop;
