import { Box, Button, TextField } from "@mui/material";
import MapPointerComponent from "../../components/MapPointer";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { useCreateBusStop } from "../../request/busStop/useCreateBusStop";
export interface BusStopForm {
  name: string;
  latitude: number;
  longitude: number;
}
interface BusForm {
  label: string;
  required: boolean;
  type: "number" | "text";
}
const busForm: Record<keyof BusStopForm, BusForm> = {
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
const ListBusStop = () => {
  const [form, setForm] = useState<BusStopForm>({
    latitude: 0,
    longitude: 0,
    name: "",
  });
  const { mutate: createBusStop } = useCreateBusStop();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [pointer, setPointer] = useState<LatLng>();
  useEffect(() => {
    if (form.latitude !== 0 && form.longitude !== 0) {
      setPointer(new LatLng(form.latitude, form.longitude));
    }
  }, [form]);
  const ListBusStop = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createBusStop(form);
  };

  return (
    <Box>
      <MapPointerComponent
        pointer={pointer}
        onChangePointer={(p) => {
          setForm({ ...form, latitude: p.lat, longitude: p.lng });
        }}
      />

      <form onSubmit={ListBusStop}>
        <Box marginY={2} gap={2} display={"flex"}>
          {Object.entries(busForm).map(([key, value]) => (
            <TextField
              fullWidth
              size="small"
              key={key}
              id="outlined-basic"
              label={value.label}
              required={value.required}
              type={value.type}
              name={key}
              value={form[key as keyof BusStopForm]}
              onChange={handleChange}
            />
          ))}
          <Button size="small" type="submit" variant="contained">
            Salvar
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default ListBusStop;
