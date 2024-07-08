import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Routing from "../Rounting";
import { BusStop } from "../../request/busStop/useGetBusStop";

interface MapComponentProps {
  to?: BusStop;
  from?: BusStop;
}
const MapComponent = ({ from, to }: MapComponentProps) => {
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
      {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {from && to && <Routing from={from} to={to}  />}
    </MapContainer>
  );
};

export default MapComponent;
