import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Routing from "../Rounting";

interface MapPointersProps {
  initialPosition?: LatLng;
  onChangePointer?: (p: { lat: number; lng: number }) => void;
  pointer?: LatLng;
  waypoints?: Array<[number, number]>;
}
const MapPointers = ({
  initialPosition,
  pointer,
  onChangePointer,
  waypoints,
}: MapPointersProps) => {
  const position = initialPosition || new LatLng(-26.9334, -48.9538);

  const ClickHandler = () => {
    useMapEvents({
      click(e) {
        onChangePointer && onChangePointer({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      },
    });

    return null;
  };
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
      {waypoints?.length && <Routing waypoints={waypoints} />}
      <ClickHandler />
      {pointer && (
        <Marker position={pointer}>
          <Popup>
            Ponto Selectionado Latitude: {pointer.lat}, Longitude: {pointer.lng}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapPointers;
