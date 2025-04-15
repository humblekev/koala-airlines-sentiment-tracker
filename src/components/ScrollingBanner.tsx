
import React from 'react';

interface ScrollingBannerProps {
  text: string;
}

const ScrollingBanner: React.FC<ScrollingBannerProps> = ({ text }) => {
  if (!text) return null;

  // Split long text into multiple copies to ensure continuous scrolling effect
  const repeatedText = `${text} • `;

  return (
    <div className="w-full bg-amber-500 overflow-hidden fixed bottom-0 left-0 py-3">
      <div className="scrolling-text-container">
        <div className="scrolling-text">
          <span className="text-white font-medium text-lg">
            {repeatedText}
          </span>
          <span className="text-white font-medium text-lg">
            {repeatedText}
          </span>
          <span className="text-white font-medium text-lg">
            {repeatedText}
          </span>
        </div>
      </div>

      <style>
        {`
        .scrolling-text-container {
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        
        .scrolling-text {
          display: inline-flex;
          white-space: nowrap;
          animation: scrollText 60s linear infinite;
        }
        
        @keyframes scrollText {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        `}
      </style>
    </div>
  );
};

export default ScrollingBanner;
