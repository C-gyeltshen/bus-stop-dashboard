import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type Bus = {
  id: string | number;
  lat: number;
  lng: number;
  eta: number;
};

interface BusMapProps {
  buses: Bus[];
}

export default function BusMap({ buses }: BusMapProps) {
  return (
    <MapContainer
      center={[27.4728, 89.6391]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // @ts-ignore
        attribution="&copy; OpenStreetMap contributors"
      />
      {buses.map((bus, idx) => (
        <Marker key={idx} position={[bus.lat, bus.lng]}>
          <Popup>
            Bus #{bus.id} <br /> ETA: {bus.eta} min
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
