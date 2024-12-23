import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  Warehouse, 
  LineChart, 
  Shield, 
  Satellite, 
  Settings,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { DroneStatus } from '../types/drone';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  droneStatus: DroneStatus;
}

const menuItems = [
  { icon: Home, label: 'Home' },
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Warehouse, label: 'Warehouses' },
  { icon: LineChart, label: 'Analytics' },
  { icon: Shield, label: 'Security' },
  { icon: Satellite, label: 'Mission Control' },
  { icon: Settings, label: 'Settings' }
];

export function Sidebar({ isCollapsed, onToggle, droneStatus }: SidebarProps) {
  return (
    <div className={`
      bg-gray-900 
      h-screen 
      transition-all 
      duration-300 
      relative
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      <div className="flex justify-end p-4">
        <button 
          onClick={onToggle} 
          className="text-gray-400 hover:text-white"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      
      <nav className="mt-8 space-y-2">
        {menuItems.map((item, index) => (
          <SidebarItem 
            key={index}
            icon={<item.icon />} 
            label={item.label} 
            isCollapsed={isCollapsed}
            isActive={item.label === 'Mission Control'}
          />
        ))}
      </nav>

      {/* Drone Location Indicator */}
      <div className={`
        absolute bottom-4 left-0 right-0 
        ${isCollapsed ? 'px-2' : 'px-4'}
      `}>
        <div className="bg-gray-800/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-green-400">
            <MapPin className="w-4 h-4" />
            {!isCollapsed && droneStatus && (
              <>
                <span className="text-xs">Current Location</span>
                <span className="text-xs font-mono">
                  {droneStatus.location.lat.toFixed(4)},
                  {droneStatus.location.lng.toFixed(4)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

function SidebarItem({ icon, label, isCollapsed, isActive }: SidebarItemProps) {
  return (
    <div className={`
      flex items-center px-4 py-3 
      ${isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-300 hover:bg-gray-800'} 
      cursor-pointer
      transition-colors
      rounded-lg
      mx-2
    `}>
      <span className="w-6 h-6">{icon}</span>
      {!isCollapsed && <span className="ml-4">{label}</span>}
    </div>
  );
}