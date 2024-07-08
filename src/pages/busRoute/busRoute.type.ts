export interface BusRouteForm {
  index: number;
  startBusStopId: number;
  endBusStopId: number;
}

interface BusForm {
  label: string;
  required: boolean;
  type: "number" | "text";
}
export const busForm: Record<keyof BusRouteForm, BusForm> = {
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
