
import React from 'react';

interface ScrollingBannerProps {
  text: string;
}

const ScrollingBanner: React.FC<ScrollingBannerProps> = ({ text }) => {
  if (!text) return null;

  // Split long text into multiple copies to ensure continuous scrolling
  const repeatedComments = `${text} • ${text} • ${text} • `;

  return (
    <div className="w-full bg-amber-500 overflow-hidden fixed bottom-0 left-0 py-3">
      <div className="whitespace-nowrap animate-[scroll_120s_linear_infinite] inline-flex">
        <span className="inline-block px-4 text-white font-medium text-lg">
          {repeatedComments}
        </span>
        <span className="inline-block px-4 text-white font-medium text-lg">
          {repeatedComments}
        </span>
      </div>
    </div>
  );
};

export default ScrollingBanner;
