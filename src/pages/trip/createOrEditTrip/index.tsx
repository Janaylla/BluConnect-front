import React, { useEffect, useState } from "react";
import { Box, Button, TextField, IconButton, styled } from "@mui/material";
import MapPointers from "../../../components/MapPointers";
import { useParams } from "react-router-dom";
import SelectToAndFrom from "../../../components/Select/SelectToAndFrom";
import { Close } from "@mui/icons-material";
import { TripForm, busForm } from "../trip.type";
import { BusStop } from "../../../request/busStop/useGetListBusStop";
import { BusRoute } from "../../../request/busRoute/useBusRoute";
import { useGetTrip } from "../../../request/trip/useGetTrip";
import { useUpdateTrip } from "../../../request/trip/useUpdateTrip";
import { useCreateTrip } from "../../../request/trip/useCreateTrip";

interface BusGenerator {
    key: string;
}

const busInit: BusGenerator = {
    key: new Date(0).getTime().toString(),
};
const busEnd: BusGenerator = {
    key: new Date(1).getTime().toString(),
};
const CreatOrEditTrip = () => {
    const { id } = useParams<{ id: string }>();

    const { data: initialTripData, isLoading } = useGetTrip(id as string);

    const [form, setForm] = useState<TripForm>({
        code: "",
        busStops: {},
    });

    const [listBusStop, setListBusStop] = useState<BusGenerator[]>([
        busInit,
        busEnd,
    ]);

    useEffect(() => {
        if (initialTripData) {
            const busStops: Record<string, BusStop> = {};
            const listBusStop: BusGenerator[] = [];
            initialTripData.busRoutes.forEach((route: BusRoute, index) => {
                if (route.startBusStop) {
                    const key = new Date(index).getTime().toString();
                    busStops[key] = route.startBusStop;
                    listBusStop.push({ key });
                }
            });
            const endStop =
                initialTripData.busRoutes[initialTripData.busRoutes.length - 1]
                    .endBusStop;
            if (endStop) {
                const key = new Date(initialTripData.busRoutes.length).getTime().toString();
                busStops[key] = endStop;
                listBusStop.push({ key });
            }

            setForm({
                code: initialTripData.code,
                busStops,
            });
            setListBusStop(listBusStop);
        }
    }, [initialTripData]);

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

        const newBusStop = { ...form.busStops };
        delete newBusStop[busGenerator.key];

        setForm({
            ...form,
            busStops: newBusStop,
        });
    };

    const { mutate: updateTrip } = useUpdateTrip();
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

            if (nextBusStop) {
                busRoutes.push({
                    startBusStopId: busStop.id,
                    endBusStopId: nextBusStop.id,
                    index: busRoutes.length,
                });
            }
        }

        if (id) {
            updateTrip({
                id: id as string,
                form: {
                    code: form.code,
                    routes: busRoutes,
                },
            });
        } else {
            createTrip({
                code: form.code,
                routes: busRoutes,
            });
        }
    };

    const [waypoints, setWaypoints] = useState<[number, number][]>([]);

    useEffect(() => {
        const waypoints: Array<[number, number]> = Object.values(
            form.busStops
        ).map((busStop) => [busStop.latitude, busStop.longitude]);

        setWaypoints([...waypoints]);
    }, [form.busStops]);

    if (isLoading && id) return <div>Carregando...</div>;


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
                                    size="medium"
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

                    <Box marginY={0} gap={2} display={"flex"} flexDirection="column">
                        {listBusStop.map((busStop, index) => {
                            const value = form.busStops[busStop.key];

                            return (
                                <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    key={busStop.key}
                                >
                                    <Box display={"flex"} gap={2} flexDirection={"row"} width={"100%"}>
                                        <Box flexGrow={1}>
                                            <SelectToAndFrom
                                                setValue={(value: BusStop | null) => {
                                                    if (value) {
                                                        setForm({
                                                            ...form,
                                                            busStops: {
                                                                ...form.busStops,
                                                                [busStop.key]: value,
                                                            },
                                                        });
                                                    }
                                                }}
                                                label={`Parada de ônibus ${index + 1}`}
                                                key={busStop.key}
                                            />
                                        </Box>
                                        <p style={
                                            {
                                                alignContent: 'center'
                                            }
                                        }>
                                            Tempo + 
                                             paradas
                                        </p>
                                        <Box >
                                            <TextField
                                                fullWidth
                                                size="medium"
                                                id="outlined-basic"
                                                required={true}
                                                type={'time'}
                                                onChange={handleChange}
                                            />
                                        </Box>
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
                    </Box>

                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={2}
                    >
                        <Button size="large" variant="outlined" onClick={addBusStop}>
                            Adicionar Parada de Ônibus
                        </Button>
                        <Button size="large" type="submit" variant="contained">
                            Salvar
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default CreatOrEditTrip;
