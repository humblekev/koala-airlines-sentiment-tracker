
import React from 'react';
import { RefreshCw, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LiveIndicator from './LiveIndicator';

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
  dataPointsCount?: number;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, isLoading, dataPointsCount = 0 }) => {
  return (
    <header className="w-full flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 md:w-36 md:h-36">
          <img 
            src="/lovable-uploads/3abccc84-9c4d-4f5e-aa35-20f4dc79fbdf.png" 
            alt="Koala Airline Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Real-Time Brand Sentiment and Customer Feedback Tracker
          </h1>
          <LiveIndicator />
          
          <div className="mt-6 inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl px-6 py-4 shadow-lg">
            <Database className="h-7 w-7 text-white mr-3" />
            <div className="flex flex-col items-start">
              <span className="text-white text-xl font-medium">Customer Data Points Analysed</span>
              <span className="text-white text-3xl font-bold mt-1">
                {dataPointsCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Button 
        onClick={onRefresh} 
        disabled={isLoading} 
        className="bg-amber-500 hover:bg-amber-600 px-8 py-3 text-white rounded-lg transition-all duration-300 text-lg font-medium shadow-md"
        size="lg"
      >
        <RefreshCw className={`h-6 w-6 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Refreshing...' : 'Refresh Data'}
      </Button>
    </header>
  );
};

export default Header;
