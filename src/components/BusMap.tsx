import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useEffect, useState } from "react";

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  if (!isClient) {
    return <div style={{ height: "400px" }} />;
  }

  return (
    <MapContainer
      center={[27.4728, 89.6391]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
