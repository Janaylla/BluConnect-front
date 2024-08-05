import { Box, Button, TextField } from "@mui/material";
import MapPointerComponent from "../../../components/MapPointers";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { useParams } from "react-router-dom";
import { BusRouteForm, busForm } from "../busRoute.type";
import { useGetBusRoute } from "../../../request/busRoute/useGetBusRoute";
import { useUpdateBusRoute } from "../../../request/busRoute/useUpdateBusRoute";

const EditBusRoute = () => {
  // const { id } = useParams<{ id: string }>(); // Obtém o ID da URL
  // const [form, setForm] = useState<BusRouteForm>({
  //   latitude: 0,
  //   longitude: 0,
  //   name: "",
  // });
  // const { data: busRoute, isLoading } = useGetBusRoute(id as string);
  // const { mutate: updateBusRoute } = useUpdateBusRoute();

  // useEffect(() => {
  //   if (busRoute) {
  //     setForm({
  //       latitude: busRoute.latitude,
  //       longitude: busRoute.longitude,
  //       name: busRoute.name,
  //     });
  //   }
  // }, [busRoute]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const [pointer, setPointer] = useState<LatLng>();
  // useEffect(() => {
  //   if (form.latitude !== 0 && form.longitude !== 0) {
  //     setPointer(new LatLng(form.latitude, form.longitude));
  //   }
  // }, [form]);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   id && updateBusRoute({ id, form });
  // };

  // if (isLoading) 
    return <div>Carregando...</div>;

  return (
    <Box>
      {/* {busRoute && (
        <MapPointerComponent
          initialPosition={new LatLng(busRoute.latitude, busRoute.longitude)}
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
              value={form[key as keyof BusRouteForm]}
              onChange={handleChange}
            />
          ))}
          <Button size="small" type="submit" variant="contained">
            Salvar
          </Button>
        </Box>
      </form> */}
    </Box>
  );
};

export default EditBusRoute;
