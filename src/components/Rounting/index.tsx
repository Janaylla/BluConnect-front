import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { Coordinator } from "../../types/Coordinator";
import { ControlOptions } from "leaflet";
interface RoutingMachineProps extends ControlOptions {
    to: Coordinator;
    from: Coordinator;
}
const createRoutineMachineLayer = ({
    from,
    to
}:RoutingMachineProps) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(to.x, to.y),
      L.latLng(from.x, from.y)
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }],
      extendToWaypoints: true,
      missingRouteTolerance: 100,
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
