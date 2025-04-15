
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
      <div className="scrolling-text-container">
        <div className="whitespace-nowrap animate-[scroll_90s_linear_infinite] inline-block">
          <span className="inline-block px-4 text-white font-medium text-lg">
            {repeatedComments}
          </span>
          <span className="inline-block px-4 text-white font-medium text-lg">
            {repeatedComments}
          </span>
        </div>
      </div>

      <style>{`
        .scrolling-text-container {
          overflow: hidden;
          width: 100%;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-\\[scroll_90s_linear_infinite\\] {
          animation: scroll 90s linear infinite;
          display: inline-block;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default ScrollingBanner;
