import { Form } from "../../types/Form";

export interface TravelScheduleForm {
  time: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  tripId: number;
}

export const busForm: Form<TravelScheduleForm> = {
  time: {
    label: 'Horário',
    required: true,
    type: 'time'
  },
  tripId: {
    label: 'a',
    required: true,
    type: 'select'
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
