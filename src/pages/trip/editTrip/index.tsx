import { Box, Button, TextField } from "@mui/material";
import MapPointerComponent from "../../../components/MapPointer";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { useParams } from "react-router-dom";
import { TripForm, busForm } from "../trip.type";
import { useGetTrip } from "../../../request/trip/useGetTrip";
import { useUpdateTrip } from "../../../request/trip/useUpdateTrip";

const EditTrip = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [form, setForm] = useState<TripForm>({
    latitude: 0,
    longitude: 0,
    name: "",
  });
  const { data: trip, isLoading } = useGetTrip(id as string);
  const { mutate: updateTrip } = useUpdateTrip();

  useEffect(() => {
    if (trip) {
      setForm({
        latitude: trip.latitude,
        longitude: trip.longitude,
        name: trip.name,
      });
    }
  }, [trip]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [pointer, setPointer] = useState<LatLng>();
  useEffect(() => {
    if (form.latitude !== 0 && form.longitude !== 0) {
      setPointer(new LatLng(form.latitude, form.longitude));
    }
  }, [form]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    id && updateTrip({ id, form });
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <Box>
      {trip && (
        <MapPointerComponent
          initialPosition={new LatLng(trip.latitude, trip.longitude)}
          pointer={pointer}
          onChangePointer={(p) => {
            setForm({ ...form, latitude: p.lat, longitude: p.lng });
          }}
        />
      )}

      <form onSubmit={handleSubmit}>
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

export default EditTrip;
