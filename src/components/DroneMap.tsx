import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { DroneStatus } from '../types/drone';
import 'leaflet/dist/leaflet.css';

interface DroneMapProps {
  status: DroneStatus;
  flightPath: Array<[number, number]>;
}

export function DroneMap({ status, flightPath }: DroneMapProps) {
  return (
    <div className="h-[500px] rounded-lg overflow-hidden">
      <MapContainer
        center={[status.location.lat, status.location.lng]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[status.location.lat, status.location.lng]}>
          <Popup>
            Drone Location<br />
            Altitude: {status.altitude}m<br />
            Speed: {status.speed}m/s
          </Popup>
        </Marker>
        <Polyline 
          positions={flightPath}
          color="#3B82F6"
          weight={2}
          opacity={0.7}
        />
      </MapContainer>
    </div>
  );
}