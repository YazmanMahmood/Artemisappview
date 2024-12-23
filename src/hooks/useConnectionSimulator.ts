import { useState, useEffect } from 'react';
import { ControlState } from '../types/interfaces';

export const useConnectionSimulator = (
  controlState: ControlState,
  onStatusUpdate: (updates: Partial<ControlState>) => void,
  onError: (error: string) => void
) => {
  useEffect(() => {
    const simulateConnection = () => {
      try {
        const newStatus = {
          battery: Math.max(0, controlState.battery - 1),
          speed: controlState.controlMode === 'manual' 
            ? Math.min(10, Math.abs(controlState.speed + (Math.random() - 0.5))) 
            : 0
        };

        onStatusUpdate(newStatus);
      } catch (error) {
        onError('Connection lost. Reconnecting...');
      }
    };

    const connectionSimulator = setInterval(simulateConnection, 3000);
    return () => clearInterval(connectionSimulator);
  }, [controlState, onStatusUpdate, onError]);
};