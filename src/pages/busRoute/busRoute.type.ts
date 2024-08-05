import { Form } from "../../types/Form";

export interface BusRouteForm {
  index: number;
  startBusStopId: number;
  endBusStopId: number;
}

export const busForm: Form<BusRouteForm> = {
  index: {
    label: "Índice",
    required: true,
    type: "number",
  },
  startBusStopId: {
    label: "Ponto de Ínicio",
    required: true,
    type: "number",
  },
  endBusStopId: {
    label: "Ponto de Fim",
    required: true,
    type: "number",
  },
};
