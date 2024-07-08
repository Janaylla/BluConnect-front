export interface TripForm {
    name: string;
    latitude: number;
    longitude: number;
  }
  
  interface BusForm {
    label: string;
    required: boolean;
    type: "number" | "text";
  }
  export const busForm: Record<keyof TripForm, BusForm> = {
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
  