import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const droneIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448436.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

interface DroneMarkerProps {
  position: [number, number];
  altitude: number;
  speed: number;
}

export const DroneMarker: React.FC<DroneMarkerProps> = ({ position, altitude, speed }) => (
  <Marker position={position} icon={droneIcon}>
    <Popup>
      Drone Location<br />
      Altitude: {altitude}m<br />
      Speed: {speed.toFixed(1)} m/s
    </Popup>
  </Marker>
);