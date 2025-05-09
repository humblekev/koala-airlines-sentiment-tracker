
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from './Header';
import SentimentCard, { SentimentType } from './SentimentCard';
import ScrollingBanner from './ScrollingBanner';
import { fetchSentimentData } from '@/api/fetchData';

// Local storage keys
const STORAGE_KEYS = {
  DATA_POINTS: 'sentiment-data-points',
  COMMENTS: 'sentiment-comments',
  SENTIMENT_DATA: 'sentiment-data',
  LAST_REFRESH: 'last-refresh-time'
};

// Helper function to validate sentiment type
const validateSentimentType = (sentiment: string | undefined): SentimentType => {
  if (!sentiment) return '' as SentimentType;
  
  const validTypes: SentimentType[] = ['Positive', 'Negative', 'Neutral', 'Mixed', ''];
  const capitalizedSentiment = sentiment.charAt(0).toUpperCase() + sentiment.slice(1).toLowerCase();
  
  return validTypes.includes(capitalizedSentiment as SentimentType) 
    ? capitalizedSentiment as SentimentType 
    : '' as SentimentType;
};

// Helper function to ensure feedback is an array
const ensureFeedbackArray = (feedback: string | string[] | undefined): string[] => {
  if (!feedback) return [];
  if (typeof feedback === 'string') return [feedback];
  return feedback;
};

// Helper functions for local storage
const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Saved to localStorage: ${key}`);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const getFromLocalStorage = (key: string, defaultValue: any) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      console.log(`No value found in localStorage for ${key}, using default`);
      return defaultValue;
    }
    console.log(`Retrieved from localStorage: ${key}`);
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
};

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize with empty/default values instead of checking localStorage
  const [dataPointsCount, setDataPointsCount] = useState(0);
  const [comments, setComments] = useState('');
  const [data, setData] = useState({
    'pre-flight-sentiment': '' as SentimentType,
    'pre-flight-feedback': [] as string[],
    'in-flight-sentiment': '' as SentimentType,
    'in-flight-feedback': [] as string[],
    'post-flight-sentiment': '' as SentimentType,
    'post-flight-feedback': [] as string[],
  });

  const handleRefresh = async () => {
    console.log('Refresh initiated');
    setIsLoading(true);

    try {
      // Record refresh attempt
      const refreshTime = new Date().toISOString();
      saveToLocalStorage(STORAGE_KEYS.LAST_REFRESH, refreshTime);
      console.log('Refresh attempt recorded at:', refreshTime);

      const newData = await fetchSentimentData();
      console.log('Data received from API:', newData);
      
      // Only update state and show success toast if we received actual data
      if (newData) {
        const dataPoints = Number(newData['Total'] || newData['total'] || 0);
        const newComments = newData['Allcomments'] || '';
        
        const updatedData = {
          'pre-flight-sentiment': validateSentimentType(newData['pre-flight-sentiment']),
          'pre-flight-feedback': ensureFeedbackArray(newData['pre-flight-feedback']),
          'in-flight-sentiment': validateSentimentType(newData['in-flight-sentiment']),
          'in-flight-feedback': ensureFeedbackArray(newData['in-flight-feedback']),
          'post-flight-sentiment': validateSentimentType(newData['post-flight-sentiment']),
          'post-flight-feedback': ensureFeedbackArray(newData['post-flight-feedback']),
        };
        
        console.log('Updating state with new data');
        
        // Update state
        setDataPointsCount(dataPoints);
        setComments(newComments);
        setData(updatedData);
        
        // Store data in local storage (we're still storing it, but not using it on initial load)
        saveToLocalStorage(STORAGE_KEYS.DATA_POINTS, dataPoints);
        saveToLocalStorage(STORAGE_KEYS.COMMENTS, newComments);
        saveToLocalStorage(STORAGE_KEYS.SENTIMENT_DATA, updatedData);
        
        // Only show success toast when we actually get data back from API
        toast({
          title: "Data refreshed",
          description: "Latest sentiment data has been loaded",
        });
        
        console.log('Refresh completed successfully');
      } else {
        console.warn('No data received from API');
        toast({
          title: "Warning",
          description: "No new data received. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to refresh data:', error);
      toast({
        title: "Error refreshing data",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log('Loading state set to false');
    }
  };

  useEffect(() => {
    console.log('Dashboard mounted, initializing data');
    handleRefresh();
    
    // Add console logging for debugging
    console.log('Initial state:', {
      dataPointsCount,
      comments: comments ? comments.substring(0, 50) + '...' : 'none',
      data: {
        'pre-flight-sentiment': data['pre-flight-sentiment'],
        'in-flight-sentiment': data['in-flight-sentiment'],
        'post-flight-sentiment': data['post-flight-sentiment'],
      }
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Header 
        onRefresh={handleRefresh} 
        isLoading={isLoading}
        dataPointsCount={dataPointsCount}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SentimentCard
          phase="Pre-Flight"
          sentiment={data['pre-flight-sentiment']}
          feedback={data['pre-flight-feedback']}
          isLoading={isLoading}
        />
        <SentimentCard
          phase="In-Flight"
          sentiment={data['in-flight-sentiment']}
          feedback={data['in-flight-feedback']}
          isLoading={isLoading}
        />
        <SentimentCard
          phase="Post-Flight"
          sentiment={data['post-flight-sentiment']}
          feedback={data['post-flight-feedback']}
          isLoading={isLoading}
        />
      </div>
      
      <div className="mt-16 mb-12 text-center">
        <p className="text-gray-500 italic text-sm">For demo purposes only. © KD</p>
      </div>

      {/* Only display the ScrollingBanner if comments exist */}
      {comments && <ScrollingBanner text={comments} />}
    </div>
  );
};

export default Dashboard;
