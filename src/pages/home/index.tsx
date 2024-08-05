import MapComponent from "../../components/Map";
import { Option } from "../../components/Select/SelectWithSearch";
import { useEffect, useState } from "react";
import SelectToAndFrom from "../../components/Select/SelectToAndFrom";
import { BusStop } from "../../request/busStop/useGetListBusStop";
import useBusRoute from "../../request/busRoute/useBusRoute";
import { Box } from "@mui/material";

const Home = () => {
  const [from, setFrom] = useState<Option<BusStop> | null>(null);
  const [to, setTo] = useState<Option<BusStop> | null>(null);

  const { data: routing } = useBusRoute({
    from_id: from?.value.id,
    to_id: to?.value.id,
  });

  const [waypoints, setWaypoints] = useState<Array<[number, number]>>([]);
  useEffect(() => {
    if (routing) {
      const waypoints: Array<[number, number]> = routing.map((route) => {
        return [route?.startBusStop?.latitude ?? 0, route?.startBusStop?.longitude ?? 0];
      });
      if (routing.length > 0)
        waypoints.push([
          routing[routing.length - 1]?.endBusStop?.latitude ?? 0,
          routing[routing.length - 1]?.endBusStop?.longitude ?? 0,
        ]);
      setWaypoints(waypoints);
    }
  }, [routing]);
  return (
    <Box 
      display={"flex"}
      flexDirection={"column"}
      gap='10px'
    >
      <SelectToAndFrom setValue={setFrom} value={from} label="De" />
      <SelectToAndFrom setValue={setTo} value={to} label="Para" />
      <MapComponent waypoints={waypoints}/>
    </Box>
  );
};

export default Home;
