import React from 'react';
import { Polyline } from 'react-leaflet';

interface FlightPathProps {
  positions: Array<[number, number]>;
}

export const FlightPath: React.FC<FlightPathProps> = ({ positions }) => (
  <Polyline 
    positions={positions} 
    color="green" 
    weight={3} 
    opacity={0.7} 
  />
);