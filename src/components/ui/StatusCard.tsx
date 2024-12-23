import React from 'react';
import { IconType } from 'react-icons';

interface StatusCardProps {
  Icon: IconType;
  label: string;
  value: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({ Icon, label, value }) => (
  <div>
    <div className="flex items-center text-gray-400 text-sm">
      <Icon className="mr-2" />
      {label}
    </div>
    <div className="font-semibold text-gray-200">{value}</div>
  </div>
);