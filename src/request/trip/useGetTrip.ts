import { useQuery } from 'react-query';
import { api } from '../axios';

const getTrip = async (id: string) => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

export const useGetTrip = (id: string) => {
  return useQuery(['trip', id], () => getTrip(id));
};
