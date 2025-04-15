import React from 'react';
import { RefreshCw, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LiveIndicator from './LiveIndicator';

interface HeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
  dataPointsCount?: number;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, isLoading, dataPointsCount = 0 }) => {
  return (
    <header className="w-full flex flex-col mb-12 relative pt-4">
      <div className="absolute top-0 left-0">
        <LiveIndicator />
      </div>
      
      <div className="absolute top-0 right-0">
        <div className="flex flex-col items-end gap-2">
          <Button 
            onClick={onRefresh} 
            disabled={isLoading} 
            className="bg-amber-500 hover:bg-amber-600 px-8 py-3 text-white rounded-lg transition-all duration-300 text-lg font-medium shadow-md"
            size="lg"
          >
            <RefreshCw className={`h-6 w-6 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <p className="text-sm text-gray-600 italic max-w-[300px] text-right">
            Our AI Agents are working hard in the background to fetch and analyse the latest data - this may take up a minute!
          </p>
        </div>
      </div>
      
      <div className="flex flex-col items-center mt-24 md:mt-16 w-full">
        <div className="w-32 h-32 md:w-36 md:h-36 mb-4">
          <img 
            src="/lovable-uploads/3abccc84-9c4d-4f5e-aa35-20f4dc79fbdf.png" 
            alt="Koala Airline Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Real-Time Brand Sentiment Tracker
          </h1>
          <div className="mt-6 flex flex-col items-center">
            <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-xl px-8 py-4 shadow-md border border-gray-200">
              <div className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <User className="h-7 w-7 text-gray-600" />
                  <span className="text-gray-600 text-xl font-medium">
                    Customer Data Points Analysed
                  </span>
                </div>
                <div className="ml-6 bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-100">
                  <span className="text-3xl font-bold text-gray-800">
                    {dataPointsCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
