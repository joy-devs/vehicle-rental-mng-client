import React from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  color: 'green' | 'blue' | 'red';
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick, color }) => {
  const colorClasses = {
    green: 'bg-green-500 hover:bg-green-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    red: 'bg-red-500 hover:bg-red-600',
  };

  return (
    <button
      onClick={onClick}
      className={`p-2 rounded ${colorClasses[color]} transition duration-300`}
    >
      {label}
    </button>
  );
};

export default ActionButton;