
import React from 'react';
import { PlaneTakeoff, Plane, PlaneLanding } from 'lucide-react';

export type SentimentType = 'Positive' | 'Negative' | 'Neutral' | 'Mixed' | '';

interface SentimentCardProps {
  phase: 'Pre-Flight' | 'In-Flight' | 'Post-Flight';
  sentiment: SentimentType;
  feedback: string[];
  isLoading: boolean;
}

const SentimentCard: React.FC<SentimentCardProps> = ({ 
  phase, 
  sentiment, 
  feedback, 
  isLoading
}) => {
  const getSentimentColorClass = () => {
    if (!sentiment) return '';
    
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'sentiment-card-positive';
      case 'negative':
        return 'sentiment-card-negative';
      case 'mixed':
        return 'sentiment-card-mixed';
      case 'neutral':
        return 'sentiment-card-neutral';
      default:
        return '';
    }
  };

  const getSentimentTextColor = () => {
    if (!sentiment) return 'text-gray-500';
    
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-positive';
      case 'negative':
        return 'text-negative';
      case 'mixed':
        return 'text-mixed-dark';
      case 'neutral':
        return 'text-neutral-dark';
      default:
        return 'text-gray-500';
    }
  };

  const getPhaseIcon = () => {
    switch (phase) {
      case 'Pre-Flight':
        return <PlaneTakeoff className="h-6 w-6" />;
      case 'In-Flight':
        return <Plane className="h-6 w-6" />;
      case 'Post-Flight':
        return <PlaneLanding className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <div className={`sentiment-card ${getSentimentColorClass()} animate-fade-in hover:shadow-lg transition-all duration-300`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {getPhaseIcon()}
          <h3 className="text-xl font-medium text-gray-700">{phase}</h3>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col space-y-4">
          <div className="h-14 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <>
          <h2 className={`text-5xl font-bold mb-6 ${getSentimentTextColor()}`}>
            {sentiment || 'No Data'}
          </h2>
          
          <div className="space-y-3">
            <h4 className="font-medium text-gray-600 text-lg">Key Feedback Areas:</h4>
            {feedback && feedback.length > 0 ? (
              <ul className="space-y-2 ml-5 list-disc text-gray-700">
                {feedback.map((item, index) => (
                  <li key={index} className="text-base">{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No feedback available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SentimentCard;
