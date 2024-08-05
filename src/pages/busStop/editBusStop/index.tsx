import { Box, Button, TextField } from "@mui/material";
import MapPointerComponent from "../../../components/MapPointers";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { useParams } from "react-router-dom";
import { BusStopFormTemplate, busFormTemplate } from "../busStop.type";
import { useGetBusStop } from "../../../request/busStop/useGetBusStop";
import { useUpdateBusStop } from "../../../request/busStop/useUpdateBusStop";

const EditBusStop = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  const [form, setForm] = useState<BusStopFormTemplate>({
    latitude: 0,
    longitude: 0,
    name: "",
  });
  const { data: busStop, isLoading } = useGetBusStop(id as string);
  const { mutate: updateBusStop } = useUpdateBusStop();

  useEffect(() => {
    if (busStop) {
      setForm({
        latitude: busStop.latitude,
        longitude: busStop.longitude,
        name: busStop.name,
      });
    }
  }, [busStop]);

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
    id && updateBusStop({ id, form });
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <Box>
      {busStop && (
        <MapPointerComponent
          initialPosition={new LatLng(busStop.latitude, busStop.longitude)}
          pointer={pointer}
          onChangePointer={(p) => {
            setForm({ ...form, latitude: p.lat, longitude: p.lng });
          }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <Box marginY={2} gap={2} display={"flex"}>
          {Object.entries(busFormTemplate).map(([key, value]) => (
            <TextField
              fullWidth
              size="small"
              key={key}
              id="outlined-basic"
              label={value.label}
              required={value.required}
              type={value.type}
              name={key}
              value={form[key as keyof BusStopFormTemplate]}
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

export default EditBusStop;
