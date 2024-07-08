

import useBusRoute from "../../request/busRoute/useBusRoute";
import { BusStop } from "../../request/busStop/useGetBusStop";
import RoutingMachine from "./RoutineMachineLayer";
import { useState, useEffect } from "react";

interface RoutingProps {
  to: BusStop;
  from: BusStop;
}
const Routing = ({ from, to }: RoutingProps) => {
  const { data: routing, isLoading } = useBusRoute({
    from_id: from.id,
    to_id: to.id,
  });
  const [waypoints, setWaypoints] = useState<Array<[number, number]>>([]);
  useEffect(() => {
    if (routing) {
      console.log(routing);
      const waypoints: Array<[number, number]> = routing.map((route) => {
        return [route.startBusStop.latitude, route.startBusStop.longitude];
      });
      waypoints.push([
        routing[routing.length - 1].endBusStop.latitude,
        routing[routing.length - 1].endBusStop.longitude,
      ]);
      console.log(waypoints);
      setWaypoints(waypoints);
    }
  }, [routing]);
  return (
    <>
      {waypoints.length && !isLoading && (
        <RoutingMachine waypoints={waypoints} />
      )}
    </>
  );
};
export default Routing;
