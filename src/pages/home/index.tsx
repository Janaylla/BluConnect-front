import MapComponent from "../../components/Map";
import { useEffect, useState } from "react";
import { BusStop } from "../../request/busStop/useGetListBusStop";
import useBusRoute from "../../request/busRoute/useBusRoute";
import { Alert, Box } from "@mui/material";
import SelectToAndFrom from "../../components/Select/SelectToAndFrom";
import { CheckCircleOutline, Warning } from "@mui/icons-material";

const Home = () => {
  const [from, setFrom] = useState<BusStop | null>(null);
  const [to, setTo] = useState<BusStop | null>(null);

  const { data: routing, isLoading } = useBusRoute({
    from_id: from?.id,
    to_id: to?.id,
  });

  const [waypoints, setWaypoints] = useState<Array<[number, number]>>([]);
  useEffect(() => {
    if (routing) {
      const waypoints: Array<[number, number]> = routing.map((route) => {
        return [route?.busStop?.latitude ?? 0, route?.busStop?.longitude ?? 0];
      });
      setWaypoints(waypoints);
    }
  }, [routing]);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap='10px'
    >
      <SelectToAndFrom setValue={setFrom} label="De" />
      <SelectToAndFrom setValue={setTo} label="Para" />
      {
        routing?.length === 0 && to && from && !isLoading && <Alert icon={<Warning fontSize="inherit" />} severity="warning">
          Não há viagens entre entes pontos
        </Alert>
      }
      <MapComponent waypoints={waypoints} />
    </Box>
  );
};

export default Home;
