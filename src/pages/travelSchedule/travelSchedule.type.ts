import SelectTrip from "../../components/SelectTrip";
import useGetListTrip from "../../request/trip/useGetListTrip";
import { useGetTrip } from "../../request/trip/useGetTrip";
import { FormTemplate } from "../../types/Form";


export interface TravelScheduleForm {
  time: string | number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  tripId: number;
}
export function secondsToHHMM(seconds: number) {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}
export const travelScheduleFormTemplate: FormTemplate<TravelScheduleForm> = {
  time: {
    label: 'Horário',
    required: true,
    type: 'time'
  },
  tripId: {
    label: 'Viagem',
    required: true,
    type: 'select',
    select: {
      getLabelByValue: (v) => v.name,
      useGetData: useGetListTrip,
    }
  },
  monday: {
    label: 'Seg',
    required: true,
    type: 'boolean'
  },
  thursday: {
    label: 'Ter',
    required: true,
    type: 'boolean'
  },
  wednesday: {
    label: 'Qua',
    required: true,
    type: 'boolean'
  },
  tuesday: {
    label: 'Qui',
    required: true,
    type: 'boolean'
  },
  friday: {
    label: 'Sex',
    required: true,
    type: 'boolean'
  },
  saturday: {
    label: 'Sáb',
    required: true,
    type: 'boolean'
  },
  sunday: {
    label: 'Dom',
    required: true,
    type: 'boolean'
  }

};
