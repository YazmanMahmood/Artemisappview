export interface DroneStatus {
  batteryPercentage: number;
  signalStrength: number;
  temperature: number;
  altitude: number;
  speed: number;
  isRecording: boolean;
  location: {
    lat: number;
    lng: number;
  };
  mode: 'manual' | 'autonomous';
}

export interface FlightPath {
  id: string;
  coordinates: Array<[number, number]>;
  timestamp: number;
}

export interface MissionParameters {
  area: string;
  duration: number;
  altitude: number;
  speed: number;
}