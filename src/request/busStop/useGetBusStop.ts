import { useQuery } from 'react-query';
import { api } from '../axios';

const getBusStop = async (id: string) => {
  const response = await api.get(`/bus-stops/${id}`);
  return response.data;
};

export const useGetBusStop = (id: string) => {
  return useQuery(['busStop', id], () => getBusStop(id));
};
