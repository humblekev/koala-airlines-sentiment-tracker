
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from './Header';
import SentimentCard, { SentimentType } from './SentimentCard';
import { fetchSentimentData } from '@/api/fetchData';

// Helper function to validate sentiment type
const validateSentimentType = (sentiment: string): SentimentType => {
  const validTypes: SentimentType[] = ['Positive', 'Negative', 'Neutral', 'Mixed', ''];
  const capitalizedSentiment = sentiment.charAt(0).toUpperCase() + sentiment.slice(1).toLowerCase();
  
  return validTypes.includes(capitalizedSentiment as SentimentType) 
    ? capitalizedSentiment as SentimentType 
    : '' as SentimentType;
};

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    'pre-flight-sentiment': '' as SentimentType,
    'pre-flight-feedback': [] as string[],
    'in-flight-sentiment': '' as SentimentType,
    'in-flight-feedback': [] as string[],
    'post-flight-sentiment': '' as SentimentType,
    'post-flight-feedback': [] as string[],
  });

  const handleRefresh = async () => {
    setIsLoading(true);

    try {
      const newData = await fetchSentimentData();
      
      // Transform the data to ensure sentiment values are valid SentimentType
      setData({
        'pre-flight-sentiment': validateSentimentType(newData['pre-flight-sentiment']),
        'pre-flight-feedback': newData['pre-flight-feedback'] || [],
        'in-flight-sentiment': validateSentimentType(newData['in-flight-sentiment']),
        'in-flight-feedback': newData['in-flight-feedback'] || [],
        'post-flight-sentiment': validateSentimentType(newData['post-flight-sentiment']),
        'post-flight-feedback': newData['post-flight-feedback'] || [],
      });
      
      toast({
        title: "Data refreshed",
        description: "Latest sentiment data has been loaded",
      });
    } catch (error) {
      console.error('Failed to refresh data:', error);
      toast({
        title: "Error refreshing data",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts
  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <Header onRefresh={handleRefresh} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
};

export default Dashboard;
