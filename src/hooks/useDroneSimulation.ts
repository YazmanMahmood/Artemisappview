import { useState, useEffect, useCallback } from 'react';
import { DroneStatus } from '../types/drone';

const INITIAL_STATUS: DroneStatus = {
  batteryPercentage: 100,
  signalStrength: 95,
  temperature: 25,
  altitude: 100,
  speed: 0,
  isRecording: false,
  location: {
    lat: 51.505,
    lng: -0.09,
  },
  mode: 'manual' as const,
};

export function useDroneSimulation() {
  const [status, setStatus] = useState<DroneStatus>(INITIAL_STATUS);
  const [flightPath, setFlightPath] = useState<Array<[number, number]>>([[INITIAL_STATUS.location.lat, INITIAL_STATUS.location.lng]]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        batteryPercentage: Math.max(0, prev.batteryPercentage - 0.1),
        temperature: prev.temperature + (Math.random() - 0.5),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleJoystickMove = useCallback(({ x, y, type }: { 
    x: number; 
    y: number; 
    type: 'movement' | 'altitude' 
  }) => {
    setStatus(prev => {
      const newStatus = { ...prev };
      
      if (type === 'movement') {
        newStatus.speed = Math.sqrt(x * x + y * y) * 10;
        newStatus.location = {
          lat: prev.location.lat + y * 0.0001,
          lng: prev.location.lng + x * 0.0001,
        };
      } else {
        newStatus.altitude = Math.max(0, prev.altitude + y * 2);
      }
      
      return newStatus;
    });

    setFlightPath(prev => [
      ...prev,
      [status.location.lat, status.location.lng],
    ]);
  }, [status.location]);

  return {
    status,
    flightPath,
    handleJoystickMove,
  };
}