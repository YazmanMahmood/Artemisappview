export interface DroneStatus {
  battery: number;
  signalStrength: string;
  temperature: number;
  altitude: number;
  speed: number;
  location: string;
  isRecording: boolean;
  connectionStatus: string;
}

export interface ControlState extends DroneStatus {
  controlMode: 'manual' | 'auto';
  timer: string;
  area: string;
  showSidebar: boolean;
  dronePosition: [number, number];
  flightPath: Array<[number, number]>;
}

export interface JoystickEvent {
  x: number | null;
  y: number | null;
}