
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LiveIndicator from './LiveIndicator';

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, isLoading }) => {
  return (
    <header className="w-full flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="mr-4 w-16 h-16 md:w-20 md:h-20">
          <img 
            src="/lovable-uploads/3abccc84-9c4d-4f5e-aa35-20f4dc79fbdf.png" 
            alt="Koala Airline Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Koala Airline</h1>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className="text-md md:text-lg text-gray-700 font-light">
              Real-Time Brand Sentiment and Customer Feedback Tracker
            </p>
            <LiveIndicator />
          </div>
        </div>
      </div>
      <Button 
        onClick={onRefresh} 
        disabled={isLoading} 
        className="bg-amber-500 hover:bg-amber-600 px-6 py-2 text-white rounded-lg transition-all duration-300"
      >
        <RefreshCw className={`h-5 w-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Refreshing...' : 'Refresh Data'}
      </Button>
    </header>
  );
};

export default Header;
