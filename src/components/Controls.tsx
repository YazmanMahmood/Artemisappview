import React, { useState } from 'react';
import { Joystick } from 'react-joystick-component';
import { Play, Pause, AlertTriangle, MapPin, Clock, Camera, Route } from 'lucide-react';
import { toast } from 'react-toastify';

interface ControlsProps {
  mode: 'manual' | 'autonomous';
  onModeChange: (mode: 'manual' | 'autonomous') => void;
  onJoystickMove: (movement: { x: number; y: number; type: 'movement' | 'altitude' }) => void;
  onMissionStart: (missionDetails: {
    area: string;
    duration: number;
    mode: string;
    waypoints?: number;
    cameraSetting?: string;
  }) => void;
  onMissionStop: () => void;
}

export function Controls({
  mode,
  onModeChange,
  onJoystickMove,
  onMissionStart,
  onMissionStop
}: ControlsProps) {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTime, setSelectedTime] = useState(0);
  const [missionType, setMissionType] = useState('survey');
  const [waypoints, setWaypoints] = useState(0);
  const [cameraSetting, setCameraSetting] = useState('standard');

  const surveillanceAreas = [
    'Urban Perimeter',
    'Agricultural Sector',
    'Forest Boundary',
    'Coastal Region',
    'Industrial Complex',
    'Zone A',
    'Zone B', 
    'Zone C'
  ];

  const surveillanceTimes = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' }
  ];

  const missionTypes = [
    { value: 'survey', label: 'Area Survey', icon: MapPin },
    { value: 'patrol', label: 'Patrol Route', icon: Route },
    { value: 'inspection', label: 'Targeted Inspection', icon: Camera }
  ];

  const waypointOptions = [
    { value: 0, label: 'No specific waypoints' },
    { value: 3, label: '3 Waypoints' },
    { value: 5, label: '5 Waypoints' },
    { value: 7, label: '7 Waypoints' }
  ];

  const cameraSettings = [
    { value: 'standard', label: 'Standard Resolution' },
    { value: 'high', label: 'High Resolution' },
    { value: 'thermal', label: 'Thermal Imaging' }
  ];

  const handleMissionStart = () => {
    if (!selectedArea || !selectedTime) {
      toast.error('Please select an area and surveillance time');
      return;
    }
    
    onMissionStart({
      area: selectedArea,
      duration: selectedTime,
      mode: missionType,
      waypoints,
      cameraSetting
    });
    
    toast.success(`Mission started in ${selectedArea} for ${selectedTime} minutes`);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Flight Controls</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onModeChange('manual')}
            className={`px-4 py-2 rounded transition-colors ${
              mode === 'manual' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => onModeChange('autonomous')}
            className={`px-4 py-2 rounded transition-colors ${
              mode === 'autonomous' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Autonomous
          </button>
        </div>
      </div>

      {mode === 'manual' ? (
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <p className="text-center text-sm text-gray-400">Movement Control</p>
            <div className="flex justify-center">
              <Joystick
                size={120}
                baseColor="#1F2937"
                stickColor="#3B82F6"
                move={(e) => onJoystickMove({ x: e.x!, y: e.y!, type: 'movement' })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-center text-sm text-gray-400">Altitude Control</p>
            <div className="flex justify-center">
              <Joystick
                size={120}
                baseColor="#1F2937"
                stickColor="#3B82F6"
                move={(e) => onJoystickMove({ x: 0, y: e.y!, type: 'altitude' })}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Autonomous Mission Configuration */}
          <div className="grid grid-cols-2 gap-6">
            {/* Area Selection */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Surveillance Area</label>
              <select 
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded text-white"
              >
                <option value="">Select Area</option>
                {surveillanceAreas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            {/* Duration Selection */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-400">Mission Duration</label>
              <select 
                value={selectedTime}
                onChange={(e) => setSelectedTime(Number(e.target.value))}
                className="w-full bg-gray-700 p-2 rounded text-white"
              >
                <option value={0}>Select Duration</option>
                {surveillanceTimes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Mission Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleMissionStart}
              disabled={!selectedArea || !selectedTime}
              className={`flex-1 flex items-center justify-center gap-2 p-2 rounded transition-colors ${
                (!selectedArea || !selectedTime) 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <Play className="w-4 h-4" /> Start Mission
            </button>
            <button
              onClick={onMissionStop}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 p-2 rounded transition-colors"
            >
              <Pause className="w-4 h-4" /> Stop Mission
            </button>
          </div>
        </div>
      )}
    </div>
  );
}