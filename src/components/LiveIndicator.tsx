
import React from 'react';

const LiveIndicator: React.FC = () => {
  return (
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 shadow-sm">
      <div className="w-4 h-4 rounded-full bg-red-500 mr-2 animate-pulse"></div>
      <span className="text-base font-bold text-red-600 tracking-wider">LIVE</span>
    </div>
  );
};

export default LiveIndicator;
