
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
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="mr-4 w-24 h-24 md:w-28 md:h-28">
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
          
          <div className="mt-4 flex items-center bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 shadow-sm">
            <Database className="h-5 w-5 text-amber-600 mr-2" />
            <span className="font-medium text-amber-800">Customer Data Points Analysed:</span>
            <span className="ml-2 bg-amber-500 text-white font-bold px-3 py-1 rounded-md">
              {dataPointsCount.toLocaleString()}
            </span>
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
