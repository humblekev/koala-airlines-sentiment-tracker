
import React from 'react';

const LiveIndicator: React.FC = () => {
  return (
    <div className="inline-flex items-center px-2 py-1 rounded-full bg-positive-light">
      <div className="w-2 h-2 rounded-full bg-positive mr-1.5 animate-pulse"></div>
      <span className="text-xs font-semibold text-positive-dark">LIVE</span>
    </div>
  );
};

export default LiveIndicator;
