import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from './components/Sidebar';
import { DroneStatus as DroneStatusComponent } from './components/DroneStatus';
import { DroneMap } from './components/DroneMap';
import { Controls } from './components/Controls';
import { useDroneSimulation } from './hooks/useDroneSimulation';

export function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mode, setMode] = useState<'manual' | 'autonomous'>('manual'); // Added state for mode
  const { status, flightPath, handleJoystickMove } = useDroneSimulation();

  const handleMissionStart = () => {
    toast.success('Mission started successfully');
  };

  const handleMissionStop = () => {
    toast.warning('Mission stopped');
  };

  const handleModeChange = (newMode: 'manual' | 'autonomous') => {
    setMode(newMode); // Update mode state
    toast.info(`Switched to ${newMode} mode`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        droneStatus={status}
      />

      {/* Main Layout */}
      <main className="flex-1 flex">
        {/* Map Section - Left */}
        <div className="w-2/3 p-4">
          <DroneMap status={status} flightPath={flightPath} />
        </div>

        {/* Controls Section - Right */}
        <div className="w-1/3 flex flex-col space-y-6 p-4">
          <h1 className="text-3xl font-bold">Drone Control Center</h1>
          <DroneStatusComponent status={status} />
          <Controls
            mode={mode} // Pass the mode state
            onModeChange={handleModeChange}
            onJoystickMove={handleJoystickMove}
            onMissionStart={handleMissionStart}
            onMissionStop={handleMissionStop}
          />
        </div>
      </main>

      {/* Notifications */}
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
}
