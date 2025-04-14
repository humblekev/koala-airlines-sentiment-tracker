
import React from 'react';

interface ScrollingBannerProps {
  text: string;
}

const ScrollingBanner: React.FC<ScrollingBannerProps> = ({ text }) => {
  if (!text) return null;

  return (
    <div className="w-full bg-amber-500 overflow-hidden fixed bottom-0 left-0 py-3">
      <div className="whitespace-nowrap animate-[scroll_20s_linear_infinite]">
        <span className="inline-block px-4 text-white font-medium text-lg">
          {text} • {text} • {text} •
        </span>
      </div>
    </div>
  );
};

export default ScrollingBanner;
