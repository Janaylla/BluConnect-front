import { Box, Button, TextField } from "@mui/material";
import MapPointerComponent from "../../../components/MapPointer";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { useCreateBusStop } from "../../../request/busStop/useCreateBusStop";
import { BusStopForm, busForm } from "../busStop.type";

const CreateBusStop = () => {
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
  const CreateBusStop = async (event: React.FormEvent<HTMLFormElement>) => {
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

      <form onSubmit={CreateBusStop}>
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
export default CreateBusStop;
