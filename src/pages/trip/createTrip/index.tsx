import { Box, Button, TextField, IconButton } from "@mui/material";
import { useCreateTrip } from "../../../request/trip/useCreateTrip";
import { TripForm, busForm } from "../trip.type"; // Função hipotética para buscar bus stops
import { BusStop } from "../../../request/busStop/useGetListBusStop";
import { useEffect, useState } from "react";
import SelectToAndFrom from "../../../components/SelectToAndFrom";
import { Option } from "../../../components/Select/SelectWithSearch";
import { Close } from "@mui/icons-material";
import MapPointers from "../../../components/MapPointers";
import { BusRoute } from "../../../request/busRoute/useBusRoute";
interface BusGenerator {
  key: string;
}
const busInit: BusGenerator = {
  key: new Date(0).getTime().toString(),
};
const busEnd: BusGenerator = {
  key: new Date(1).getTime().toString(),
};
const CreateTrip = () => {
  const [form, setForm] = useState<TripForm>({
    code: "",
    busStops: {},
  });
  const [listBusStop, setListBusStop] = useState<BusGenerator[]>([
    busInit,
    busEnd,
  ]);
  const addBusStop = () => {
    setListBusStop([
      ...listBusStop,
      {
        key: new Date().getTime().toString(),
      },
    ]);
  };
  const deleteBusStop = (index: number, busGenerator: BusGenerator) => {
    const newListBusStop = [...listBusStop];
    newListBusStop.splice(index, 1);
    setListBusStop(newListBusStop);
    const newBusRoutes = { ...form.busStops };
    delete newBusRoutes[busGenerator.key];
    setForm({
      ...form,
      busStops: newBusRoutes,
    });
  };
  const { mutate: createTrip } = useCreateTrip();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const busRoutes: BusRoute[] = [];
    for (let i = 0; i < listBusStop.length; i++) {
      const busStop = form.busStops[listBusStop[i].key];
      const nextBusStop = form.busStops[listBusStop[i + 1]?.key];
      if(nextBusStop) {
        busRoutes.push({
          startBusStopId: busStop.id,
          endBusStopId: nextBusStop.id,
          index: busRoutes.length,
        });
      }
    }
    createTrip({
      code: form.code,
      routes: busRoutes,
    });
  };
  const [waypoints, setWaypoints] = useState<[number, number][]>([]);
  useEffect(() => {
    const waypoints: Array<[number, number]> = Object.values(
      form.busStops
    ).map((busStop) => [busStop.latitude, busStop.longitude]);
    setWaypoints([...waypoints]);
  }, [form.busStops]);
  return (
    <Box>
      <MapPointers waypoints={waypoints} />
      {waypoints.toString()}
      <form onSubmit={handleSubmit}>
        <Box marginY={2} gap={2} display={"flex"} flexDirection="column">
          {Object.entries(busForm).map(
            ([key, value]) =>
              !value.ignore && (
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
              )
          )}
          <Box
            marginY={0}
            gap={2}
            display={"flex"}
            flexDirection="column"
          ></Box>
          {listBusStop.map((busStop, index) => {
            const value = form.busStops[busStop.key];
            return (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                key={busStop.key}
              >
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                  <SelectToAndFrom
                    setValue={(value: Option<BusStop> | null) => {
                      if (value) {
                        setForm({
                          ...form,
                          busStops: {
                            ...form.busStops,
                            [busStop.key]: value.value,
                          },
                        });
                      }
                    }}
                    label={`Parada de ônibus ${index + 1}`}
                    key={busStop.key}
                    value={{
                      label: value?.name || "",
                      value: value || null,
                    }}
                  />
                </Box>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteBusStop(index, busStop)}
                >
                  <Close />
                </IconButton>
              </Box>
            );
          })}
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
          >
            <Button size="medium" variant="contained" onClick={addBusStop}>
              Adicionar Parada de Ônibus
            </Button>
            <Button size="medium" type="submit" variant="contained">
              Salvar
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default CreateTrip;
