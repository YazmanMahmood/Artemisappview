import React from 'react';

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-gray-400 mb-2">{label}</label>
    <select
      className="w-full bg-gray-700 text-gray-200 border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-gray-800">
          {option}
        </option>
      ))}
    </select>
  </div>
);