
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
    <header className="w-full flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex items-center">
        <div className="mr-3">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#3B82F6" />
            <path d="M12 20C12 14.477 16.477 10 22 10C27.523 10 32 14.477 32 20C32 25.523 27.523 30 22 30C16.477 30 12 25.523 12 20Z" fill="#FFFFFF" />
            <circle cx="22" cy="17" r="2" fill="#3B82F6" />
            <circle cx="19" cy="22" r="2" fill="#3B82F6" />
            <circle cx="25" cy="22" r="2" fill="#3B82F6" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-playfair">Koala Airline</h1>
          <div className="flex items-center">
            <p className="text-sm text-gray-500 mr-2">Brand Sentiment Dashboard</p>
            <LiveIndicator />
          </div>
        </div>
      </div>
      <Button 
        onClick={onRefresh} 
        disabled={isLoading} 
        className="bg-primary hover:bg-primary/90"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Refreshing...' : 'Refresh Data'}
      </Button>
    </header>
  );
};

export default Header;
