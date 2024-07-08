import { Box, Button, TextField } from "@mui/material";
import MapPointerComponent from "../../../components/MapPointer";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { useCreateTrip } from "../../../request/trip/useCreateTrip";
import { TripForm, busForm } from "../trip.type";

const CreateTrip = () => {
  const [form, setForm] = useState<TripForm>({
    latitude: 0,
    longitude: 0,
    name: "",
  });
  const { mutate: createTrip } = useCreateTrip();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [pointer, setPointer] = useState<LatLng>();
  useEffect(() => {
    if (form.latitude !== 0 && form.longitude !== 0) {
      setPointer(new LatLng(form.latitude, form.longitude));
    }
  }, [form]);
  const CreateTrip = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTrip(form);
  };

  return (
    <Box>
      <MapPointerComponent
        pointer={pointer}
        onChangePointer={(p) => {
          setForm({ ...form, latitude: p.lat, longitude: p.lng });
        }}
      />

      <form onSubmit={CreateTrip}>
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
              value={form[key as keyof TripForm]}
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
export default CreateTrip;
