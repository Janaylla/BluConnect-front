import { useQuery } from 'react-query';
import { api } from '../axios';

const getTravelSchedule = async (id: string) => {
  const response = await api.get(`/bus-stops/${id}`);
  return response.data;
};

export const useGetTravelSchedule = (id: string) => {
  return useQuery(['travelSchedule', id], () => getTravelSchedule(id));
};
