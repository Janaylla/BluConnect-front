import { Box, Button, TextField } from "@mui/material";
import MapPointerComponent from "../../../components/MapPointers";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import { useCreateBusRoute } from "../../../request/busRoute/useCreateBusRoute";
import { BusRouteForm, busForm } from "../busRoute.type";

const CreateBusRoute = () => {
  // const [form, setForm] = useState<BusRouteForm>({
  //   latitude: 0,
  //   longitude: 0,
  //   name: "",
  // });
  // const { mutate: createBusRoute } = useCreateBusRoute();
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  // const [pointer, setPointer] = useState<LatLng>();
  // useEffect(() => {
  //   if (form.latitude !== 0 && form.longitude !== 0) {
  //     setPointer(new LatLng(form.latitude, form.longitude));
  //   }
  // }, [form]);
  // const CreateBusRoute = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   createBusRoute(form);
  // };

  return (
    <Box>
      {/* <MapPointerComponent
        pointer={}
        onChangePointer={(p) => {
          setForm({ ...form, latitude: p.lat, longitude: p.lng });
        }}
      />

      <form onSubmit={CreateBusRoute}>
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
export default CreateBusRoute;
