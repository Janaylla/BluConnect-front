import { Form } from "../../types/Form";

export interface BusStopForm {
  name: string;
  latitude: number;
  longitude: number;
}

export const busForm: Form<BusStopForm> = {
  name: {
    label: "Nome",
    required: true,
    type: "text",
  },
  latitude: {
    label: "Latitude",
    required: true,
    type: "number",
  },
  longitude: {
    label: "Longitude",
    required: true,
    type: "number",
  },
};
