
import React from 'react';

const LiveIndicator: React.FC = () => {
  return (
    <div className="inline-flex items-center px-6 py-3 rounded-full bg-red-100 shadow-sm">
      <div className="w-6 h-6 rounded-full bg-red-500 mr-3 animate-pulse"></div>
      <span className="text-lg font-bold text-red-600 tracking-wider">LIVE</span>
    </div>
  );
};

export default LiveIndicator;
