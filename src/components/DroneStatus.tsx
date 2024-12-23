import React from 'react';
import { Battery, Signal, Thermometer, Compass, Gauge, Video } from 'lucide-react';
import { DroneStatus as DroneStatusType } from '../types/drone';

interface StatusProps {
  status: DroneStatusType;
}

export function DroneStatus({ status }: StatusProps) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg">
      <StatusCard
        icon={<Battery className="w-6 h-6" />}
        label="Battery"
        value={`${status.batteryPercentage.toFixed(1)}%`}
        alert={status.batteryPercentage < 20}
      />
      <StatusCard
        icon={<Signal className="w-6 h-6" />}
        label="Signal"
        value={`${status.signalStrength.toFixed(1)}%`}
        alert={status.signalStrength < 50}
      />
      <StatusCard
        icon={<Thermometer className="w-6 h-6" />}
        label="Temperature"
        value={`${status.temperature.toFixed(1)}°C`}
        alert={status.temperature > 40}
      />
      <StatusCard
        icon={<Compass className="w-6 h-6" />}
        label="Altitude"
        value={`${status.altitude.toFixed(1)}m`}
      />
      <StatusCard
        icon={<Gauge className="w-6 h-6" />}
        label="Speed"
        value={`${status.speed.toFixed(1)}m/s`}
      />
      <StatusCard
        icon={<Video className="w-6 h-6" />}
        label="Recording"
        value={status.isRecording ? "Active" : "Inactive"}
        alert={status.isRecording}
      />
    </div>
  );
}

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  alert?: boolean;
}

function StatusCard({ icon, label, value, alert }: StatusCardProps) {
  return (
    <div className={`p-3 rounded-lg ${alert ? 'bg-red-900/20' : 'bg-gray-700/50'}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-sm text-gray-300">{label}</span>
      </div>
      <div className="text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

// Example of how to use with more realistic values
export const exampleDroneStatus: DroneStatusType = {
  batteryPercentage: 98.6,
  signalStrength: 87.5,
  temperature: 32.4,
  altitude: 45.7,
  speed: 12.3,
  isRecording: true
};