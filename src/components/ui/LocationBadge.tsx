import React from 'react';

interface LocationBadgeProps {
  text: string;
}

export const LocationBadge: React.FC<LocationBadgeProps> = ({ text }) => (
  <div className="bg-gray-700 text-gray-200 rounded-full px-4 py-2 shadow-md">
    <span>{text}</span>
  </div>
);