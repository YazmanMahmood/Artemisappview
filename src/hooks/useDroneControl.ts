import { useState, useCallback } from 'react';
import { ControlState, JoystickEvent } from '../types/interfaces';
import { toast } from 'react-toastify';

const INITIAL_STATE: ControlState = {
  controlMode: 'manual',
  location: 'Idle',
  battery: 85,
  signalStrength: 'Strong',
  temperature: 25,
  altitude: 10,
  speed: 0,
  timer: '5min',
  area: 'zone1',
  showSidebar: false,
  dronePosition: [51.505, -0.09],
  flightPath: [],
  isRecording: false,
  connectionStatus: 'Connected'
};

export const useDroneControl = () => {
  const [state, setState] = useState<ControlState>(INITIAL_STATE);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const handleMove = useCallback((event: JoystickEvent) => {
    if (event.x === null || event.y === null) return;

    const newPosition: [number, number] = [
      state.dronePosition[0] + event.y * 0.001,
      state.dronePosition[1] + event.x * 0.001
    ];

    const location = 
      event.x > 0 ? 'Moving Right' : 
      event.x < 0 ? 'Moving Left' : 
      event.y > 0 ? 'Moving Down' : 
      event.y < 0 ? 'Moving Up' : 'Idle';
    
    setState(prev => ({ 
      ...prev, 
      location,
      speed: Math.abs(event.x || event.y) * 5,
      dronePosition: newPosition,
      flightPath: [...prev.flightPath, newPosition]
    }));
  }, [state.dronePosition]);

  const handleStop = useCallback(() => {
    setState(prev => ({ ...prev, location: 'Idle', speed: 0 }));
  }, []);

  const toggleRecording = useCallback(() => {
    setState(prev => {
      const newRecordingStatus = !prev.isRecording;
      toast(newRecordingStatus ? 'Recording Started' : 'Recording Stopped', {
        type: newRecordingStatus ? 'success' : 'info'
      });
      return { ...prev, isRecording: newRecordingStatus };
    });
  }, []);

  const updateControlState = useCallback((updates: Partial<ControlState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    state,
    connectionError,
    setConnectionError,
    handleMove,
    handleStop,
    toggleRecording,
    updateControlState
  };
};