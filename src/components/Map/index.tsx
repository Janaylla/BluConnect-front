import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import * as L from "leaflet";
import { useEffect } from "react";

interface MapComponentProps {
  waypoints: [number, number][];
}

const MapComponent = ({ waypoints }: MapComponentProps) => {
  const position = new LatLng(-26.9334, -48.9538);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "70vh",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/axiom-pattern.png)",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingComponent waypoints={waypoints} /> 
    </MapContainer>
  );
};


const RoutingComponent = ({ waypoints }: { waypoints: [number, number][] }) => {
  const map = useMap(); 

  useEffect(() => {
    if (map && waypoints.length > 0) {
      map.eachLayer((layer) => {
        if (layer instanceof L.Routing.Control) {
          map.removeLayer(layer);
        }
      });

      const routingControl = L.Routing.control({
        waypoints: waypoints.map(
          (point) => L.latLng(point[0], point[1])
        ),
        lineOptions: {
          styles: [{ color: 'blue', weight: 4 }],
          extendToWaypoints: false,
          missingRouteTolerance: 1
        },
        routeWhileDragging: false,
        addWaypoints: false,
        show: false,
        formatter: new L.Routing.Formatter({
          distanceTemplate: '',
        }),
        collapsible: true, 
      }).addTo(map);

      const routePanel: any = document.querySelector('.leaflet-routing-container');
      if (routePanel) {
        routePanel.style.display = 'none';
      }
      return () => {
        if (map && routingControl) {
          map.removeControl(routingControl); 
        }
      };
    }
  }, [map, waypoints]); 
  return null; 
};


export default MapComponent;
