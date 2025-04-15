
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from './Header';
import SentimentCard, { SentimentType } from './SentimentCard';
import ScrollingBanner from './ScrollingBanner';
import { fetchSentimentData } from '@/api/fetchData';

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

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    try {
      const newData = await fetchSentimentData();
      console.log('Data received from API:', newData);
      
      // Only update state and show success toast if we received actual data
      if (newData) {
        setDataPointsCount(Number(newData['Total'] || newData['total'] || 0));
        setComments(newData['Allcomments'] || '');
        
        setData({
          'pre-flight-sentiment': validateSentimentType(newData['pre-flight-sentiment']),
          'pre-flight-feedback': ensureFeedbackArray(newData['pre-flight-feedback']),
          'in-flight-sentiment': validateSentimentType(newData['in-flight-sentiment']),
          'in-flight-feedback': ensureFeedbackArray(newData['in-flight-feedback']),
          'post-flight-sentiment': validateSentimentType(newData['post-flight-sentiment']),
          'post-flight-feedback': ensureFeedbackArray(newData['post-flight-feedback']),
        });
        
        // Only show success toast when we actually get data back from API
        toast({
          title: "Data refreshed",
          description: "Latest sentiment data has been loaded",
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
    }
  };

  useEffect(() => {
    handleRefresh();
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

      <ScrollingBanner text={comments} />
    </div>
  );
};

export default Dashboard;
